// Letters to God: checkout for the standalone store (no Shopify). Cloudflare Worker + Stripe Checkout + KV.
//   POST /checkout               validates the cart, prices it on the server, parks it in KV as pending:<id>, returns { url } (Stripe Checkout)
//   POST /stripe-webhook         verifies Stripe's signature; on checkout.session.completed moves pending:<id> to order:<id> (idempotent)
//   POST /subscribe              { email, hp }               newsletter list, stored as sub:<email>
//   POST /contact                { name, email, topic, message, hp }   stored as msg:<time>-<rand>, optional NOTIFY_WEBHOOK ping
//   GET  /admin/orders           Bearer ADMIN_TOKEN; paid orders waiting to be printed (used by fulfil/fulfil.py)
//   POST /admin/orders/:id/done  Bearer ADMIN_TOKEN; marks an order as sent to print
//   GET  /admin/messages, /admin/subscribers   Bearer ADMIN_TOKEN
// Secrets (wrangler secret put): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ADMIN_TOKEN, optional NOTIFY_WEBHOOK
// Vars (wrangler.toml): SITE_URL, ALLOWED_ORIGIN, SHIPPING_BASE_CENTS, SHIPPING_EXTRA_CENTS, STRIPE_AUTOMATIC_TAX ("1" once Stripe Tax is set up)

export const PRICES = { 3: 2800, 6: 3800, 12: 4800 };   // cents, USD; must match the page
export const SET_PRICE = 12900;                         // three 12-moon books, shipped separately
export const VOLUMES = { god: "Letters to God", future: "Letters to Future Me", body: "Letters to My Body" };
export const TZS = ["America/New_York", "America/Chicago", "America/Denver", "America/Phoenix", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu"];
export const LIMITS = { lines: 6, qty: 10, books: 12 };
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const addDays = (iso, n) => { const d = new Date(iso + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const booksIn = lines => lines.reduce((n, l) => n + l.qty * (l.kind === "set" ? 3 : 1), 0);

// A cart is { email, lines: [{ kind: "book"|"set", volume?, months, mode, name, start_date, tz, qty }] }.
// Every line carries its own name and dates, so a cart can hold gifts for different people.
export function validate(o, todayIso = new Date().toISOString().slice(0, 10)) {
  const err = m => ({ error: m });
  if (!o || typeof o !== "object") return err("Bad request.");
  if (!Array.isArray(o.lines) || o.lines.length < 1) return err("Your cart is empty.");
  if (o.lines.length > LIMITS.lines) return err("A cart holds up to six different books. Split this into two orders.");
  if (!EMAIL.test(o.email || "")) return err("Add a valid email.");
  const lines = [];
  for (const l of o.lines) {
    if (!l || typeof l !== "object") return err("Bad request.");
    const kind = l.kind === "set" ? "set" : "book";
    if (kind === "book" && !VOLUMES[l.volume]) return err("Unknown volume.");
    const months = kind === "set" ? 12 : l.months;
    if (!PRICES[months]) return err("Unknown length.");
    if (l.mode !== "deep" && l.mode !== "daily") return err("Choose how you answer.");
    const qty = l.qty === undefined ? 1 : l.qty;
    if (!Number.isInteger(qty) || qty < 1 || qty > LIMITS.qty) return err("Quantity must be between 1 and 10.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(l.start_date || "")) return err("Choose a start date.");
    // one day of slack either side: a buyer's local date can be a day behind the server's UTC date
    if (l.start_date < addDays(todayIso, -1) || l.start_date > addDays(todayIso, 400)) return err("Choose a start date within the next year.");
    if (!TZS.includes(l.tz)) return err("Unknown time zone.");
    const name = typeof l.name === "string" ? l.name.replace(/\s+/g, " ").trim().slice(0, 40) : "";
    lines.push({ kind, ...(kind === "book" ? { volume: l.volume } : {}), months, mode: l.mode, name, start_date: l.start_date, tz: l.tz, qty });   // any client-sent price is dropped here
  }
  if (booksIn(lines) > LIMITS.books) return err("That is more than twelve books. Split this into two orders, or write to us for a bulk price.");
  return { ok: { email: o.email.trim(), lines } };
}

export function shippingCents(lines, env = {}) {
  const base = Number(env.SHIPPING_BASE_CENTS ?? 500), extra = Number(env.SHIPPING_EXTRA_CENTS ?? 200);
  return base + extra * (booksIn(lines) - 1);
}
export const unitCents = l => (l.kind === "set" ? SET_PRICE : PRICES[l.months]);
export function priceCart(o, env = {}) {
  const subtotal = o.lines.reduce((n, l) => n + unitCents(l) * l.qty, 0), shipping = shippingCents(o.lines, env);
  return { subtotal, shipping, total: subtotal + shipping };
}
export const lineTitle = l => (l.kind === "set" ? "Letters to God: the trilogy (three books)" : `${VOLUMES[l.volume]}, ${l.months} moons`);
export const lineDesc = l => `${l.mode === "daily" ? "Seven lines a week" : "One deep prompt a week"}. First moon on or after ${l.start_date} (${l.tz.split("/")[1].replace("_", " ")} time)${l.name ? ", for " + l.name : ""}. Printed to order.`;

export function checkoutForm(o, env, orderId) {
  const f = new URLSearchParams(), tax = env.STRIPE_AUTOMATIC_TAX === "1";
  f.set("mode", "payment");
  f.set("success_url", `${env.SITE_URL}/thank-you/?order=${orderId}`);
  f.set("cancel_url", `${env.SITE_URL}/shop/`);
  f.set("customer_email", o.email);
  f.set("client_reference_id", orderId);
  o.lines.forEach((l, i) => {
    const p = `line_items[${i}]`;
    f.set(`${p}[quantity]`, String(l.qty));
    f.set(`${p}[price_data][currency]`, "usd");
    f.set(`${p}[price_data][unit_amount]`, String(unitCents(l)));
    f.set(`${p}[price_data][product_data][name]`, lineTitle(l));
    f.set(`${p}[price_data][product_data][description]`, lineDesc(l).slice(0, 500));
    if (tax) f.set(`${p}[price_data][tax_behavior]`, "exclusive");
  });
  f.set("shipping_address_collection[allowed_countries][0]", "US");
  f.set("phone_number_collection[enabled]", "true");   // the print partner requires a phone number
  const s = "shipping_options[0][shipping_rate_data]", n = booksIn(o.lines);
  f.set(`${s}[type]`, "fixed_amount");
  f.set(`${s}[display_name]`, n === 1 ? "US shipping" : `US shipping, ${n} books`);
  f.set(`${s}[fixed_amount][amount]`, String(shippingCents(o.lines, env)));
  f.set(`${s}[fixed_amount][currency]`, "usd");
  if (tax) { f.set(`${s}[tax_behavior]`, "exclusive"); f.set("automatic_tax[enabled]", "true"); }
  f.set("metadata[order_id]", orderId);           // the cart itself waits in KV as pending:<id>
  return f;
}

export async function verifyStripeSignature(body, header, secret, toleranceSec = 300, now = Date.now()) {
  const pairs = (header || "").split(",").map(p => p.split("="));
  const t = (pairs.find(p => p[0] === "t") || [])[1], v1 = pairs.filter(p => p[0] === "v1").map(p => p[1]);
  if (!t || !v1.length || !secret) return false;
  if (Math.abs(now / 1000 - Number(t)) > toleranceSec) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
  return v1.some(s => { if (s.length !== hex.length) return false; let d = 0; for (let i = 0; i < s.length; i++) d |= s.charCodeAt(i) ^ hex.charCodeAt(i); return d === 0; });
}

const cors = env => ({ "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" });
const json = (env, obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors(env) } });
const authed = (req, env) => !!env.ADMIN_TOKEN && (req.headers.get("Authorization") || "") === `Bearer ${env.ADMIN_TOKEN}`;
const clip = (s, n) => (typeof s === "string" ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n) : "");
async function listAll(kv, prefix) {
  const out = []; let cursor;
  do { const r = await kv.list({ prefix, cursor }); for (const k of r.keys) out.push(k.name); cursor = r.list_complete === false ? r.cursor : undefined; } while (cursor);
  return out;
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url), path = url.pathname;
    if (req.method === "OPTIONS") return new Response(null, { headers: cors(env) });
    const body = async () => { try { return await req.json(); } catch { return null; } };

    if (path === "/checkout" && req.method === "POST") {
      const v = validate(await body()); if (v.error) return json(env, v, 400);
      const orderId = "LTG-" + crypto.randomUUID().slice(0, 8).toUpperCase();
      const order = { id: orderId, created: new Date().toISOString(), ...v.ok, totals: priceCart(v.ok, env) };
      await env.ORDERS.put("pending:" + orderId, JSON.stringify(order), { expirationTtl: 60 * 60 * 72 });
      const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST", headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: checkoutForm(v.ok, env, orderId)
      });
      const s = await r.json();
      if (!r.ok) { await env.ORDERS.delete("pending:" + orderId); return json(env, { error: "Checkout could not start." }, 502); }
      return json(env, { url: s.url, id: orderId, totals: order.totals });
    }

    if (path === "/stripe-webhook" && req.method === "POST") {
      const raw = await req.text();
      if (!(await verifyStripeSignature(raw, req.headers.get("Stripe-Signature"), env.STRIPE_WEBHOOK_SECRET))) return new Response("bad signature", { status: 400 });
      const ev = JSON.parse(raw), s = ev.data?.object;
      if (ev.type === "checkout.session.completed" && s.payment_status === "paid") {
        const id = s.metadata?.order_id;
        if (id && !(await env.ORDERS.get("order:" + id))) {                 // idempotent: Stripe may deliver twice
          const pending = await env.ORDERS.get("pending:" + id);
          const ship = s.shipping_details || s.collected_information?.shipping_details || null;
          const rec = {
            id, status: pending ? "paid" : "needs_attention", paid_at: new Date().toISOString(), session: s.id,
            order: pending ? JSON.parse(pending) : null,       // needs_attention: paid, but the cart expired from KV; rebuild it from the Stripe line items
            email: s.customer_details?.email, phone: s.customer_details?.phone, ship_to: ship, amount_total: s.amount_total
          };
          await env.ORDERS.put("order:" + id, JSON.stringify(rec));
          await env.ORDERS.delete("pending:" + id);
          if (env.NOTIFY_WEBHOOK) ctx?.waitUntil(fetch(env.NOTIFY_WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: `Letters to God order ${id}: $${(s.amount_total / 100).toFixed(2)} paid${pending ? "" : " (NEEDS ATTENTION: cart missing)"}` }) }).catch(() => {}));
        }
      }
      if (ev.type === "checkout.session.expired" && s?.metadata?.order_id) await env.ORDERS.delete("pending:" + s.metadata.order_id);
      return new Response("ok");
    }

    if (path === "/subscribe" && req.method === "POST") {
      const b = await body(); if (!b) return json(env, { error: "Bad request." }, 400);
      if (b.hp) return json(env, { ok: true });                              // honeypot: bots fill it, people never see it
      const email = clip(b.email, 120).toLowerCase();
      if (!EMAIL.test(email)) return json(env, { error: "Add a valid email." }, 400);
      await env.ORDERS.put("sub:" + email, JSON.stringify({ email, at: new Date().toISOString(), src: clip(b.src, 40) }));
      return json(env, { ok: true });
    }

    if (path === "/contact" && req.method === "POST") {
      const b = await body(); if (!b) return json(env, { error: "Bad request." }, 400);
      if (b.hp) return json(env, { ok: true });
      const m = { name: clip(b.name, 80), email: clip(b.email, 120), topic: clip(b.topic, 40), message: clip(b.message, 4000), at: new Date().toISOString() };
      if (!EMAIL.test(m.email)) return json(env, { error: "Add a valid email so we can reply." }, 400);
      if (m.message.length < 5) return json(env, { error: "Write a few words first." }, 400);
      await env.ORDERS.put(`msg:${m.at}-${crypto.randomUUID().slice(0, 6)}`, JSON.stringify(m));
      if (env.NOTIFY_WEBHOOK) ctx?.waitUntil(fetch(env.NOTIFY_WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Letters to God message from ${m.name || m.email} (${m.topic || "general"}): ${m.message.slice(0, 300)}` }) }).catch(() => {}));
      return json(env, { ok: true });
    }

    if (path.startsWith("/admin/")) {
      if (!authed(req, env)) return new Response("unauthorized", { status: 401 });
      const listJson = async (prefix, keep = () => true) => {
        const out = []; for (const k of await listAll(env.ORDERS, prefix)) { const o = JSON.parse(await env.ORDERS.get(k)); if (keep(o)) out.push(o); }
        return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
      };
      if (path === "/admin/orders" && req.method === "GET") return listJson("order:", o => o.status === "paid" || o.status === "needs_attention");
      if (path === "/admin/messages" && req.method === "GET") return listJson("msg:");
      if (path === "/admin/subscribers" && req.method === "GET") return listJson("sub:");
      const m = path.match(/^\/admin\/orders\/([\w-]+)\/done$/);
      if (m && req.method === "POST") {
        const raw = await env.ORDERS.get("order:" + m[1]); if (!raw) return new Response("not found", { status: 404 });
        const o = JSON.parse(raw); o.status = "sent_to_print"; o.sent_at = new Date().toISOString();
        await env.ORDERS.put("order:" + m[1], JSON.stringify(o)); return new Response("ok");
      }
    }
    return new Response("Letters to God checkout", { status: 404 });
  }
};
