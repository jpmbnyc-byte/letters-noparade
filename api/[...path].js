// One Vercel Function for every /api/* route. It runs the same handler as the Cloudflare Worker (lib/worker.js) on Redis instead of KV.
//   POST /api/checkout  /api/stripe-webhook  /api/subscribe  /api/contact      GET /api/admin/orders  /api/admin/messages  /api/admin/subscribers
import worker from "../lib/worker.js";
import { ORDERS } from "../lib/kv.js";

export default async function handler(req, res) {
  try {
    const chunks = []; for await (const c of req) chunks.push(c);            // raw body: the Stripe signature is checked against it
    const raw = Buffer.concat(chunks);
    const proto = req.headers["x-forwarded-proto"] || "https", host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL((req.url || "/").replace(/^\/api(?=\/|\?|$)/, "") || "/", `${proto}://${host}`);
    const headers = new Headers(); for (const [k, v] of Object.entries(req.headers)) if (v != null) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
    const init = { method: req.method, headers }; if (!["GET", "HEAD"].includes(req.method)) init.body = raw;
    const site = process.env.SITE_URL || `${proto}://${host}`;
    const env = { ...process.env, ORDERS, SITE_URL: site, ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || site };
    const pending = []; const ctx = { waitUntil: p => pending.push(Promise.resolve(p).catch(() => {})) };
    const r = await worker.fetch(new Request(url, init), env, ctx);
    await Promise.allSettled(pending);                                        // finish notification pings before the function freezes
    res.statusCode = r.status; r.headers.forEach((v, k) => res.setHeader(k, v));
    res.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    console.error(e);
    res.statusCode = 500; res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ error: "Server error." }));
  }
}
