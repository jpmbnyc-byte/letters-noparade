import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { webcrypto } from "node:crypto";
globalThis.crypto ??= webcrypto;

// in-memory Upstash REST (GET SET DEL SCAN with paging), plus a Stripe stub
const db = new Map(), ttl = new Map(); let stripeBody, calls = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = async (u, init) => {
  u = String(u);
  if (u === "https://redis.test") {
    assert.equal(init.headers.Authorization, "Bearer rtok"); const [c, ...a] = JSON.parse(init.body); calls++;
    if (c === "GET") return Response.json({ result: db.get(a[0]) ?? null });
    if (c === "SET") { db.set(a[0], a[1]); if (a[2] === "EX") ttl.set(a[0], Number(a[3])); return Response.json({ result: "OK" }); }
    if (c === "DEL") { db.delete(a[0]); return Response.json({ result: 1 }); }
    if (c === "SCAN") { const all = [...db.keys()].filter(k => k.startsWith(a[2].replace(/\\(.)/g, "$1").slice(0, -1))).sort(); const i = Number(a[0]), page = all.slice(i, i + 2);
      return Response.json({ result: [i + 2 >= all.length ? "0" : String(i + 2), page] }); }   // pages of 2 to exercise the cursor loop
  }
  if (u.startsWith("https://api.stripe.com/")) { stripeBody = new URLSearchParams(init.body); return Response.json({ url: "https://checkout.stripe.test/c/1" }); }
  return new Response("ok");
};
process.env.KV_REST_API_URL = "https://redis.test"; process.env.KV_REST_API_TOKEN = "rtok";
process.env.STRIPE_SECRET_KEY = "sk_test"; process.env.STRIPE_WEBHOOK_SECRET = "whsec_t"; process.env.ADMIN_TOKEN = "adm";
const { default: handler } = await import("./api/[...path].js");

const call = async (method, path, body, headers = {}) => {
  const raw = body == null ? "" : typeof body === "string" ? body : JSON.stringify(body);
  const req = Readable.from(raw ? [Buffer.from(raw)] : []); Object.assign(req, { method, url: path, headers: { host: "letters.test", "x-forwarded-proto": "https", ...headers } });
  const out = { headers: {} }; const res = { setHeader: (k, v) => (out.headers[k.toLowerCase()] = v), end: b => { out.body = b ? b.toString() : ""; out.done(); } };
  await new Promise(done => { out.done = done; Object.defineProperty(res, "statusCode", { set: v => (out.status = v), get: () => out.status }); handler(req, res); });
  return out;
};
const day = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
const book = (o = {}) => ({ kind: "book", volume: "god", months: 12, mode: "deep", name: "Marielle", start_date: day, tz: "America/New_York", qty: 1, ...o });

let r = await call("POST", "/api/checkout", { email: "a@b.co", lines: [book(), book({ volume: "body", qty: 2 })] }, { "content-type": "application/json" });
assert.equal(r.status, 200, r.body); const co = JSON.parse(r.body); assert.equal(co.url, "https://checkout.stripe.test/c/1"); assert.equal(co.totals.subtotal, 14400);
const id = stripeBody.get("metadata[order_id]"); assert.ok(db.has("pending:" + id)); assert.equal(ttl.get("pending:" + id), 259200);
assert.equal(stripeBody.get("success_url"), `https://letters.test/thank-you/?order=${id}`);          // SITE_URL falls back to the request host
assert.equal((await call("POST", "/api/checkout", { email: "a@b.co", lines: [] })).status, 400);

const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("whsec_t"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
const sign = async (b, t) => [...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${b}`)))].map(x => x.toString(16).padStart(2, "0")).join("");
const ev = (oid, sid) => JSON.stringify({ type: "checkout.session.completed", data: { object: { id: sid, payment_status: "paid", amount_total: 15300, metadata: { order_id: oid },
  customer_details: { email: "a@b.co" }, shipping_details: { name: "A B", address: { line1: "1 Broadway", city: "Bayonne", state: "NJ", postal_code: "07002", country: "US" } } } } });
const wh = async e => { const t = Math.floor(Date.now() / 1000); return call("POST", "/api/stripe-webhook", e, { "stripe-signature": `t=${t},v1=${await sign(e, t)}` }); };
assert.equal((await wh(ev(id, "cs_1"))).status, 200); assert.equal((await wh(ev(id, "cs_1"))).status, 200);   // twice
assert.ok(db.has("order:" + id) && !db.has("pending:" + id));
assert.equal((await call("POST", "/api/stripe-webhook", ev(id, "cs_2"), { "stripe-signature": "t=1,v1=00" })).status, 400);
await wh(ev("LTG-GONE", "cs_3"));

assert.equal((await call("GET", "/api/admin/orders")).status, 401);
const list = JSON.parse((await call("GET", "/api/admin/orders", null, { authorization: "Bearer adm" })).body);
assert.equal(list.length, 2); assert.equal(list.find(o => o.id === "LTG-GONE").status, "needs_attention");
assert.equal((await call("POST", `/api/admin/orders/${id}/done`, "", { authorization: "Bearer adm" })).status, 200);
assert.equal(JSON.parse((await call("GET", "/api/admin/orders", null, { authorization: "Bearer adm" })).body).length, 1);

assert.equal((await call("POST", "/api/subscribe", { email: "Reader@Example.com" })).status, 200); assert.ok(db.has("sub:reader@example.com"));
assert.equal((await call("POST", "/api/contact", { name: "A", email: "a@b.co", topic: "order", message: "Where is my book?" })).status, 200);
assert.equal(JSON.parse((await call("GET", "/api/admin/messages", null, { authorization: "Bearer adm" })).body).length, 1);
assert.equal((await call("OPTIONS", "/api/checkout")).status, 200);
assert.equal((await call("GET", "/api/nothing")).status, 404);
// owner's orders page
r = await call("GET", "/admin"); assert.equal(r.status, 303); assert.equal(r.headers.location, "/admin/login");
assert.equal((await call("GET", "/api/admin/order/" + id)).status, 303);                       // same page via the /api path
assert.match((await call("GET", "/admin/login")).body, /Sign in/);
assert.equal((await call("POST", "/admin/login", "password=nope", { "content-type": "application/x-www-form-urlencoded" })).status, 401);
r = await call("POST", "/admin/login", "password=adm", { "content-type": "application/x-www-form-urlencoded" });
assert.equal(r.status, 303); const cookie = r.headers["set-cookie"].split(";")[0]; assert.match(r.headers["set-cookie"], /HttpOnly; Secure; SameSite=Lax/);
assert.equal((await call("GET", "/admin", null, { cookie: "ltg_admin=9999999999.forged" })).status, 303);
r = await call("GET", "/admin?view=all", null, { cookie }); assert.equal(r.status, 200);
assert.match(r.body, new RegExp(id)); assert.match(r.body, /LTG-GONE/); assert.match(r.body, /Needs attention/); assert.equal(r.headers["x-robots-tag"], "noindex, nofollow");
r = await call("GET", "/admin/order/" + id, null, { cookie }); assert.match(r.body, /Letters to God, 12 moons/); assert.match(r.body, /Bayonne, NJ, 07002/); assert.match(r.body, /for Marielle/);
const form = "status=shipped&printer_order_id=RPI-123&carrier=USPS&tracking_number=9400+1000&tracking_url=&note=Left+the+printer";
r = await call("POST", "/admin/order/" + id, form, { cookie, "content-type": "application/x-www-form-urlencoded", origin: "https://letters.test" });
assert.equal(r.status, 303);
const saved = JSON.parse(db.get("order:" + id));
assert.equal(saved.status, "shipped"); assert.equal(saved.printer_order_id, "RPI-123"); assert.ok(saved.shipped_at);
assert.equal(saved.tracking.url, "https://tools.usps.com/go/TrackConfirmAction?tLabels=94001000");
assert.equal(saved.history.at(-1).note, "Left the printer");
assert.match((await call("GET", "/admin/order/" + id, null, { cookie })).body, /Track USPS 94001000/);
assert.equal((await call("POST", "/admin/order/" + id, "status=delivered", { cookie, "content-type": "application/x-www-form-urlencoded", origin: "https://evil.test" })).status, 403);
r = await call("POST", "/admin/order/" + id, "status=shipped&carrier=Other&tracking_number=X1&tracking_url=javascript:alert(1)", { cookie, "content-type": "application/x-www-form-urlencoded" });
assert.equal(JSON.parse(db.get("order:" + id)).tracking.url, "");                               // only https links are kept
assert.match((await call("GET", "/admin?view=messages", null, { cookie })).body, /Where is my book/);
assert.equal((await call("GET", "/api/admin/orders", null, { cookie })).status, 401);          // JSON routes still need the Bearer token
assert.equal((await call("GET", "/admin/logout")).headers["set-cookie"].includes("Max-Age=0"), true);
console.log("vercel adapter tests passed;", calls, "redis calls");
