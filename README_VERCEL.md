# Letters to God store on Vercel

Static site in `public/`, and one Vercel Function (`api/[...path].js`) that does checkout, the Stripe webhook, sign-ups, contact and the order list. Orders live in Upstash Redis. The same handler ran as a Cloudflare Worker before, and is tested here (`node test.mjs`).

## Deploy (works from a phone browser)

1. **Put this folder in a GitHub repo** (Vercel deploys from Git). 
2. **Vercel > Add New > Project > import the repo.** Leave the framework as Other. Deploy.
3. **Vercel > Storage > Create Database > Upstash Redis** (free plan is fine). Connect it to the project. It adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you.
4. **Project > Settings > Environment Variables**, add:
   - `STRIPE_SECRET_KEY` (start with `sk_test_...`)
   - `ADMIN_TOKEN` (any long random string; it opens `/api/admin/orders`)
   - `SITE_URL` = `https://letters.noparade.store`
   - `SHIPPING_BASE_CENTS` = `500` and `SHIPPING_EXTRA_CENTS` = `200` (placeholders: replace with Lulu's real quote)
   - `STRIPE_AUTOMATIC_TAX` = `0` (set `1` once Stripe Tax is on)
   - optional `NOTIFY_WEBHOOK` (a Slack or Discord webhook URL)
5. **Project > Settings > Domains > add `letters.noparade.store`.** Vercel shows a DNS record. In Namecheap, Domain List > noparade.store > Advanced DNS, add a **CNAME**: Host `letters`, Value = what Vercel shows (usually `cname.vercel-dns.com`), TTL Automatic. Leave the `www` and `@` records alone.
6. **Stripe > Developers > Webhooks > add endpoint** `https://letters.noparade.store/api/stripe-webhook`, events `checkout.session.completed` and `checkout.session.expired`. Copy its signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`.
7. **Redeploy** (Deployments > the latest one > Redeploy) so the new variables apply.
8. Buy a test book with card 4242 4242 4242 4242. It should appear at `/api/admin/orders` with header `Authorization: Bearer <ADMIN_TOKEN>`.

## Fulfilment

`WORKER_URL=https://letters.noparade.store/api` and `ADMIN_TOKEN=...`, then `python fulfil.py --pull` (see the fulfil folder). Nothing else changes.

## Changing the site

`public/` is the built site. To rebuild it from source: run `python build.py --site https://letters.noparade.store` in the source folder, copy `dist/deploy/*` into `public/` (delete its `_headers`; `vercel.json` carries the headers), and set `endpoint: "/api"` in `public/config.js`. After launch, `public/config.js` is where you set `legalDraft: false` once you have reviewed the legal pages, and the real `leadTime`.

## Notes

- The function needs Node 20+ (set in `package.json`).
- If checkout says "Redis is not connected", step 3 is not done or needs a redeploy.
- Stripe Checkout cannot run inside a frame, so link to the store; do not iframe it.
