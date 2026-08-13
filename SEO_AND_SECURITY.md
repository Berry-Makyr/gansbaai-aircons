# SEO and security operations checklist

Canonical site: **https://www.gbaircon.co.za**

## Google Search Console (required for rankings)

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://www.gbaircon.co.za` (URL-prefix) and ideally the Domain property `gbaircon.co.za`
3. Verify ownership (DNS TXT or HTML tag)
4. Submit sitemap: `https://www.gbaircon.co.za/sitemap.xml`
5. Use **URL Inspection** on `https://www.gbaircon.co.za/` → **Request indexing**

## Google Business Profile

1. Open your [Google Business Profile](https://business.google.com/)
2. Set **Website** to `https://www.gbaircon.co.za` (not Facebook or any old domain)
3. Confirm NAP matches the site (phone, address, hours)

## Favicon in Google Search

The site serves a high-contrast brand favicon at `/favicon.ico` and `/brand/favicon-48.png` (48×48+ as Google recommends).

Google caches favicons separately and can keep an old icon (including the default Vercel triangle) for **days to weeks**. After a favicon change:

1. Confirm `https://www.gbaircon.co.za/favicon.ico` shows the navy + GANSBAAI / AIRCON mark
2. In Search Console → **URL Inspection** on `https://www.gbaircon.co.za/` → **Request indexing**
3. Wait for Googlebot to recrawl the homepage

## Old / alternate domains

- Live site redirects apex `gbaircon.co.za` → `www.gbaircon.co.za` (already configured)
- Do **not** set canonical/OG/schema to `gansbaaiaircon.co.za`
- If you own `gansbaaiaircon.co.za`, 301-redirect it to `https://www.gbaircon.co.za`

## Sanity dataset + enquiry PII

Preview stores website enquiries in **Neon** (`DATABASE_URL`), not Sanity. Existing Sanity enquiry documents were migrated and deleted.

Keep the dataset **private** until production is on the same Neon contact form. A public dataset plus the current live form would leak new enquiry PII.

- Every Vercel environment that should show live CRM images still needs `SANITY_API_WRITE_TOKEN` or `SANITY_API_READ_TOKEN` — including Preview.
- Studio users still sign in normally. Enquiries and analytics APIs require a Sanity member bearer token.
- After adding/changing Sanity tokens or `DATABASE_URL` on Preview, redeploy the preview branch
- After production cutover: make the dataset public and drop the token from the published-content client.

## Vercel webhook

Point the Sanity webhook for revalidation at:

`https://www.gbaircon.co.za/api/revalidate`

(not a preview deployment URL)

## Contact form protection

- Server-side honeypot on `bot-field`
- Rate limit: 5 submissions / hour / IP (best-effort on serverless)
- Optional: enable Vercel Firewall / WAF rules on `/api/contact` for stronger abuse protection

## Website analytics (Studio + Vercel)

- Public site uses `@vercel/analytics` + `@vercel/speed-insights`
- Studio **Analytics** tool (Sanity members only) shows enquiry stats and Vercel traffic via `/api/analytics/summary`
- That API uses server-only `VERCEL_API_TOKEN` (+ `VERCEL_PROJECT_ID` / `VERCEL_TEAM_ID`) and is gated by Studio referrer or optional `ANALYTICS_API_SECRET`
- Optional GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) remains supported but is not required for the Studio dashboard
