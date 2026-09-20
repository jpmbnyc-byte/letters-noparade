// Minimal key-value store on Upstash Redis over REST, with the same get/put/delete/list shape the Worker code uses for Cloudflare KV.
// Vercel: Storage > Marketplace > Upstash Redis injects KV_REST_API_URL and KV_REST_API_TOKEN (older setups: UPSTASH_REDIS_REST_URL / _TOKEN).
const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function cmd(...args) {
  if (!url() || !token()) throw new Error("Redis is not connected: add Upstash Redis under Vercel Storage and redeploy.");
  const r = await fetch(url(), { method: "POST", headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }, body: JSON.stringify(args) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error("redis: " + (j.error || r.status));
  return j.result;
}
const esc = s => s.replace(/[\\*?\[\]]/g, m => "\\" + m);

export const ORDERS = {
  async get(k) { const v = await cmd("GET", k); return v === undefined ? null : v; },
  async put(k, v, o) { return o && o.expirationTtl ? cmd("SET", k, String(v), "EX", String(Math.max(60, o.expirationTtl))) : cmd("SET", k, String(v)); },
  async delete(k) { await cmd("DEL", k); },
  async list({ prefix = "" } = {}) {
    const keys = []; let cursor = "0";
    do { const [next, batch] = await cmd("SCAN", cursor, "MATCH", esc(prefix) + "*", "COUNT", "500"); cursor = String(next); for (const name of batch) keys.push({ name }); } while (cursor !== "0");
    keys.sort((a, b) => (a.name < b.name ? -1 : 1));
    return { keys: [...new Map(keys.map(k => [k.name, k])).values()], list_complete: true };
  },
};
