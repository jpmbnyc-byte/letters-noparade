// Orders page for the shop owner, served by the same function as the API.
//   GET  /admin                    orders by stage (?view=todo|printing|shipped|done|all|messages)
//   GET  /admin/order/:id          one order: books, address, history, and a form to update status and tracking
//   POST /admin/order/:id          save status / tracking / printer order id / note
//   GET|POST /admin/login, GET /admin/logout
// Sign-in uses ADMIN_PASSWORD (falls back to ADMIN_TOKEN). The session is an HttpOnly cookie signed with ADMIN_TOKEN,
// valid 30 days; changing ADMIN_TOKEN signs every session out. The JSON routes (/admin/orders …) still take the Bearer token.

export const STATUSES = {
  paid: "Paid: make the files",
  needs_attention: "Needs attention",
  files_ready: "Files ready",
  sent_to_print: "Sent to printer",
  printing: "Printing",
  shipped: "Shipped",
  delivered: "Delivered",
  problem: "Problem",
  refunded: "Refunded / cancelled",
};
const VIEWS = {
  todo: ["To do", ["needs_attention", "problem", "paid", "files_ready"]],
  printing: ["At the printer", ["sent_to_print", "printing"]],
  shipped: ["Shipped", ["shipped"]],
  done: ["Done", ["delivered", "refunded"]],
  all: ["All", Object.keys(STATUSES)],
};
const STAMP = { sent_to_print: "sent_at", shipped: "shipped_at", delivered: "delivered_at" };
const CARRIERS = {
  USPS: n => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(n)}`,
  UPS: n => `https://www.ups.com/track?tracknum=${encodeURIComponent(n)}`,
  FedEx: n => `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(n)}`,
  DHL: n => `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${encodeURIComponent(n)}`,
};
const COOKIE = "ltg_admin", TTL = 30 * 24 * 3600;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = c => (typeof c === "number" ? `$${(c / 100).toFixed(2)}` : "—");
const when = iso => (iso ? new Date(iso).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—");
const safeUrl = u => (/^https:\/\/[^\s"'<>]+$/i.test(u || "") ? u : "");

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return [...new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg)))].map(b => b.toString(16).padStart(2, "0")).join("");
}
const same = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };

async function signedIn(req, env) {
  const c = (req.headers.get("Cookie") || "").split(";").map(s => s.trim()).find(s => s.startsWith(COOKIE + "="));
  if (!c) return false;
  const [exp, sig] = c.slice(COOKIE.length + 1).split(".");
  return /^\d+$/.test(exp || "") && Number(exp) > Date.now() / 1000 && !!sig && same(sig, await hmac(env.ADMIN_TOKEN, "admin:" + exp));
}
async function sessionCookie(env) {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  return `${COOKIE}=${exp}.${await hmac(env.ADMIN_TOKEN, "admin:" + exp)}; Path=/; Max-Age=${TTL}; HttpOnly; Secure; SameSite=Lax`;
}

const HEAD = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, private", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" };
const html = (body, status = 200, extra = {}) => new Response(body, { status, headers: { ...HEAD, ...extra } });
const redirect = (to, extra = {}) => new Response(null, { status: 303, headers: { Location: to, "Cache-Control": "no-store", ...extra } });

const CSS = `
:root{--bg:#f7f5f1;--card:#fff;--ink:#1d1b18;--mute:#6b665e;--line:#e4dfd6;--accent:#7a4b1f;--good:#2f6b3a;--warn:#9a5a00;--bad:#a4302a}
@media (prefers-color-scheme:dark){:root{--bg:#151412;--card:#1e1c19;--ink:#ece8e1;--mute:#a39c91;--line:#34302a;--accent:#e0a96d;--good:#7cc58a;--warn:#e7b25c;--bad:#f08a80}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
header{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--card)}
header b{margin-right:auto}a{color:var(--accent)}main{max-width:900px;margin:0 auto;padding:16px}
nav{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}nav a{padding:6px 12px;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--ink);background:var(--card)}
nav a.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px;margin-bottom:10px}
a.card{display:block;text-decoration:none;color:inherit}.row{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.mute{color:var(--mute);font-size:13px}.tag{display:inline-block;font-size:12px;padding:2px 8px;border-radius:999px;border:1px solid var(--line);white-space:nowrap}
.tag.needs_attention,.tag.problem{color:var(--bad);border-color:var(--bad)}.tag.paid,.tag.files_ready{color:var(--warn);border-color:var(--warn)}
.tag.shipped,.tag.delivered{color:var(--good);border-color:var(--good)}
h1{font-size:20px;margin:4px 0 12px}h2{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);margin:18px 0 8px}
form.stack{display:flex;flex-direction:column;gap:10px}label{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--mute)}
input,select,textarea,button{font:inherit;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)}
button{background:var(--accent);color:#fff;border:0;cursor:pointer}ul{margin:6px 0;padding-left:18px}.big{font-size:22px;font-weight:600}
.counts{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin-bottom:14px}`;

const page = (title, body, nav = true) => `<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<meta name=robots content="noindex,nofollow"><title>${esc(title)} · Letters to God orders</title><style>${CSS}</style></head><body>
<header><b>Letters to God · Orders</b>${nav ? `<a href="/admin">Orders</a><a href="/admin?view=messages">Messages</a><a href="/admin/logout">Sign out</a>` : ""}</header>
<main>${body}</main></body></html>`;

function loginPage(env, error = "") {
  const setup = !env.ADMIN_TOKEN ? `<p class=mute style="color:var(--bad)">ADMIN_TOKEN is not set in Vercel, so nobody can sign in yet.</p>` : "";
  return page("Sign in", `<div class=card style="max-width:380px;margin:40px auto"><h1>Sign in</h1>${setup}
${error ? `<p style="color:var(--bad)">${esc(error)}</p>` : ""}
<form class=stack method=post action="/admin/login"><label>Password<input name=password type=password autocomplete=current-password required autofocus></label>
<button>Sign in</button></form><p class=mute>Use ADMIN_PASSWORD from Vercel (or ADMIN_TOKEN if you haven't set one).</p></div>`, false);
}

function linesHtml(o, h) {
  const lines = o.order?.lines;
  if (!lines) return `<p style="color:var(--bad)">The cart expired before payment was confirmed. Rebuild it from the Stripe payment (session ${esc(o.session)}).</p>`;
  return `<ul>${lines.map(l => `<li><b>${esc(h.lineTitle(l))}</b>${l.qty > 1 ? ` × ${l.qty}` : ""}<br><span class=mute>${esc(h.lineDesc(l))}</span></li>`).join("")}</ul>`;
}
function address(ship) {
  if (!ship) return "<span class=mute>No address on file</span>";
  const a = ship.address || {};
  return [ship.name, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country].filter(Boolean).map(esc).join("<br>");
}
const booksCount = o => (o.order?.lines || []).reduce((n, l) => n + l.qty * (l.kind === "set" ? 3 : 1), 0);
const tracking = o => (o.tracking?.url ? `<a href="${esc(o.tracking.url)}" target=_blank rel=noopener>Track ${esc(o.tracking.carrier || "")} ${esc(o.tracking.number || "")}</a>` : "");

async function loadAll(env, h, prefix) {
  const out = [];
  for (const k of await h.listAll(env.ORDERS, prefix)) { const raw = await env.ORDERS.get(k); if (raw) out.push(JSON.parse(raw)); }
  return out;
}

async function listPage(env, h, view) {
  if (view === "messages") {
    const msgs = (await loadAll(env, h, "msg:")).sort((a, b) => (a.at < b.at ? 1 : -1));
    const body = msgs.map(m => `<div class=card><div class=row><b>${esc(m.name || m.email)}</b><span class=mute>${when(m.at)}</span></div>
<div class=mute>${esc(m.email)} · ${esc(m.topic || "general")}</div><p style="white-space:pre-wrap">${esc(m.message)}</p>
<a href="mailto:${esc(m.email)}">Reply by email</a></div>`).join("") || `<p class=mute>No messages yet.</p>`;
    return page("Messages", `<h1>Messages · ${msgs.length}</h1>${body}`);
  }
  const all = (await loadAll(env, h, "order:")).sort((a, b) => (a.paid_at < b.paid_at ? 1 : -1));
  const [label, statuses] = VIEWS[view] || VIEWS.todo;
  const shown = all.filter(o => statuses.includes(o.status));
  const count = k => all.filter(o => VIEWS[k][1].includes(o.status)).length;
  const month = new Date().toISOString().slice(0, 7);
  const monthSales = all.filter(o => (o.paid_at || "").startsWith(month) && o.status !== "refunded").reduce((n, o) => n + (o.amount_total || 0), 0);
  const counts = `<div class=counts>
<div class=card><div class=mute>To do</div><div class=big>${count("todo")}</div></div>
<div class=card><div class=mute>At the printer</div><div class=big>${count("printing")}</div></div>
<div class=card><div class=mute>Shipped</div><div class=big>${count("shipped")}</div></div>
<div class=card><div class=mute>Sales this month</div><div class=big>${money(monthSales)}</div></div></div>`;
  const tabs = `<nav>${Object.entries(VIEWS).map(([k, [t]]) => `<a href="/admin?view=${k}" class="${(VIEWS[view] ? view : "todo") === k ? "on" : ""}">${t} (${count(k)})</a>`).join("")}</nav>`;
  const cards = shown.map(o => `<a class=card href="/admin/order/${esc(o.id)}"><div class=row><b>${esc(o.id)}</b><span class="tag ${esc(o.status)}">${esc(STATUSES[o.status] || o.status)}</span></div>
<div class=row><span>${esc(o.ship_to?.name || o.email || "")} · ${booksCount(o) || "?"} book${booksCount(o) === 1 ? "" : "s"} · ${money(o.amount_total)}</span><span class=mute>${when(o.paid_at)}</span></div>
${o.tracking?.number ? `<div class=mute>${esc(o.tracking.carrier || "")} ${esc(o.tracking.number)}</div>` : ""}</a>`).join("") || `<p class=mute>Nothing here.</p>`;
  return page("Orders", counts + tabs + `<h1>${esc(label)} · ${shown.length}</h1>` + cards);
}

function orderPage(o, h, saved) {
  const opts = Object.entries(STATUSES).map(([k, t]) => `<option value="${k}"${k === o.status ? " selected" : ""}>${esc(t)}</option>`).join("");
  const carriers = ["", ...Object.keys(CARRIERS), "Other"].map(c => `<option${c === (o.tracking?.carrier || "") ? " selected" : ""}>${c}</option>`).join("");
  const history = (o.history || []).slice().reverse().map(e => `<li><b>${esc(STATUSES[e.status] || e.status)}</b> · <span class=mute>${when(e.at)}</span>${e.note ? `<br>${esc(e.note)}` : ""}</li>`).join("");
  return page(o.id, `<p><a href="/admin">← All orders</a></p>${saved ? `<p style="color:var(--good)">Saved.</p>` : ""}
<div class=card><div class=row><h1 style="margin:0">${esc(o.id)}</h1><span class="tag ${esc(o.status)}">${esc(STATUSES[o.status] || o.status)}</span></div>
<div class=mute>Paid ${when(o.paid_at)} · ${money(o.amount_total)}${o.order?.totals ? ` (books ${money(o.order.totals.subtotal)} + shipping ${money(o.order.totals.shipping)})` : ""}</div>
${tracking(o) ? `<p>${tracking(o)}</p>` : ""}</div>
<h2>Books</h2><div class=card>${linesHtml(o, h)}</div>
<h2>Ship to</h2><div class=card>${address(o.ship_to)}<div class=mute style="margin-top:6px">${esc(o.email || "")}${o.phone ? " · " + esc(o.phone) : ""}</div>
${o.email ? `<p><a href="mailto:${esc(o.email)}?subject=${encodeURIComponent("Your Letters to God order " + o.id)}">Email the customer</a></p>` : ""}</div>
<h2>Update</h2><div class=card><form class=stack method=post action="/admin/order/${esc(o.id)}">
<label>Status<select name=status>${opts}</select></label>
<label>Printer order number (e.g. RPI)<input name=printer_order_id value="${esc(o.printer_order_id || "")}"></label>
<label>Carrier<select name=carrier>${carriers}</select></label>
<label>Tracking number<input name=tracking_number value="${esc(o.tracking?.number || "")}"></label>
<label>Tracking link (only needed for "Other")<input name=tracking_url type=url value="${esc(o.tracking?.carrier === "Other" ? o.tracking?.url || "" : "")}" placeholder="https://…"></label>
<label>Note (added to history)<textarea name=note rows=2></textarea></label>
<button>Save</button></form></div>
<h2>History</h2><div class=card>${history ? `<ul>${history}</ul>` : `<span class=mute>No updates yet.</span>`}</div>`);
}

export function applyUpdate(o, f, now = new Date().toISOString()) {
  const status = STATUSES[f.get("status")] ? f.get("status") : o.status;
  const note = (f.get("note") || "").trim().slice(0, 1000);
  const carrier = (f.get("carrier") || "").trim(), number = (f.get("tracking_number") || "").replace(/\s+/g, "").slice(0, 60);
  const url = CARRIERS[carrier] && number ? CARRIERS[carrier](number) : safeUrl((f.get("tracking_url") || "").trim());
  const changed = status !== o.status;
  o.printer_order_id = (f.get("printer_order_id") || "").trim().slice(0, 80) || undefined;
  o.tracking = carrier || number ? { carrier, number, url } : undefined;
  if (changed) { o.status = status; if (STAMP[status] && !o[STAMP[status]]) o[STAMP[status]] = now; }
  if (changed || note) (o.history ||= []).push({ at: now, status, ...(note ? { note } : {}) });
  o.updated_at = now;
  return o;
}

// Returns a Response for owner pages, or null so the caller falls through to the JSON admin routes.
export async function adminPages(req, env, url, h) {
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const isPage = path === "/admin" || path === "/admin/login" || path === "/admin/logout" || /^\/admin\/order\/[\w-]+$/.test(path);
  if (!isPage) return null;
  if (path === "/admin/logout") return redirect("/admin/login", { "Set-Cookie": `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  if (path === "/admin/login") {
    if (req.method !== "POST") return html(loginPage(env));
    const f = new URLSearchParams(await req.text()), given = f.get("password") || "", want = env.ADMIN_PASSWORD || env.ADMIN_TOKEN || "";
    if (env.ADMIN_TOKEN && want && same(given, want)) return redirect("/admin", { "Set-Cookie": await sessionCookie(env) });
    await new Promise(r => setTimeout(r, 800));                                 // slow down guessing
    return html(loginPage(env, "Wrong password."), 401);
  }
  if (!env.ADMIN_TOKEN || !(await signedIn(req, env))) return redirect("/admin/login");
  if (req.method === "POST") {
    const origin = req.headers.get("Origin");
    if (origin && new URL(origin).host !== url.host) return html(page("Blocked", "<p>Cross-site form blocked.</p>"), 403);
  }
  if (path === "/admin") return html(await listPage(env, h, url.searchParams.get("view") || "todo"));
  const id = path.split("/").pop(), raw = await env.ORDERS.get("order:" + id);
  if (!raw) return html(page("Not found", `<p>No order ${esc(id)}. <a href="/admin">Back</a></p>`), 404);
  const o = JSON.parse(raw);
  if (req.method === "POST") {
    await env.ORDERS.put("order:" + id, JSON.stringify(applyUpdate(o, new URLSearchParams(await req.text()))));
    return redirect(`/admin/order/${encodeURIComponent(id)}?saved=1`);
  }
  return html(orderPage(o, h, url.searchParams.get("saved") === "1"));
}
