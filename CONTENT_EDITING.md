# Editing Website Content (Sanity Studio)

The Gansbaai Aircon website is powered by **Sanity CMS**. You and your customer can edit text, phone numbers, images, services, and gallery photos **without touching code**.

## Quick start

1. Run the site locally: `npm run dev` (from the `frontend` folder)
2. Open the editor: **http://localhost:3000/studio**
3. Sign in with your Sanity account (invite your customer from [sanity.io/manage](https://www.sanity.io/manage))
4. Edit a section → click **Publish**
5. Refresh the homepage to see changes

On the live Vercel site, use **https://www.gbaircon.co.za/studio**.

## First-time setup

### 1. Seed initial content

After Sanity is configured in `.env.local`, run once:

```bash
npm run seed
```

You need a **write token** in `.env.local`:

```
SANITY_API_WRITE_TOKEN=your_token_here
```

The `production` dataset is **private** (so website enquiries are not publicly readable). The Next.js server uses this write token (or an optional `SANITY_API_READ_TOKEN`) to fetch published content.

Create tokens at [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Tokens** (Editor role for writes).

The seed script uploads gallery images and creates all homepage content with the confirmed contact details:

| Field | Value |
|-------|-------|
| Main phone (landline) | 028 384 0703 |
| WhatsApp | 072 822 9897 |
| 24hr emergency | 072 822 9897 |
| Email | admin@gbaircon.co.za |
| Address | 33 Industry Circle, Gansbaai Industrial, 7220 |

These details can be updated later in Studio under **Business & Contact Details**.

### 2. Invite your customer

In [sanity.io/manage](https://www.sanity.io/manage) → **Members** → **Invite member**. They only need access to Sanity, not Vercel or GitHub.

## What you can edit

| Studio section | What it controls |
|----------------|------------------|
| **Business & Contact Details** | Phones, WhatsApp, email, address, hours, Google Maps/review URLs, SEO |
| **Hero** | Headline, tagline, desktop + mobile hero background images, quote button text |
| **Why Choose Us** | Trust points and descriptions |
| **Community Outreach** | Fundraiser message, images, hashtags |
| **Our Legacy** | Timeline milestones |
| **Approved Dealers** | Dealer names and logo uploads |
| **Customer Reviews** | Review cards (use verified Google reviews only) |
| **Services** | All service cards — title, description, icon, order |
| **Gallery Images** | Project photos — upload, title, alt text, category, display order |
| **Website Enquiries** | New quote and contact form submissions, status, and internal follow-up notes |
| **Analytics** (top toolbar) | Enquiry pipeline + Vercel traffic (visitors, pageviews, referrers) |
| **Insights (Blog)** | Posts, authors, and categories for `/insights` articles |

Service landing pages (`/services/...`) use each Service’s title, slug, and description. Edit those under **Services**. Homepage FAQ copy is currently in code (`src/data/faq.ts`).

## Website Analytics (Studio)

Open **Analytics** in the Studio top toolbar (same Sanity login as the CRM). Only invited Sanity members can see it — the website owner does **not** need a Vercel login or domain/DNS access.

**Works immediately:** enquiry counts (new / 7 days / 30 days), status breakdown, top requested services, and recent submissions.

**Traffic (Vercel Web Analytics):** the public site already sends data via `@vercel/analytics`. To show that data inside Studio, add a Vercel API token on **your** Vercel project:

| Variable | Purpose |
|----------|---------|
| `VERCEL_API_TOKEN` | Personal/team access token from [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | Usually auto-injected by Vercel (`prj_…`). Set manually in `.env.local` for local Studio. |
| `VERCEL_TEAM_ID` | Required for team-owned projects (`team_…` / org id from `.vercel/project.json`) |
| `ANALYTICS_API_SECRET` | Optional. If set, `/api/analytics/summary` requires header `x-analytics-secret` |

### Setup steps

1. Confirm **Web Analytics** is enabled on the Vercel project (Analytics tab)
2. Create an access token → set `VERCEL_API_TOKEN` in Vercel env vars (Production + Preview if you use preview Studio)
3. Set `VERCEL_TEAM_ID` if the project is under a team (see `.vercel/project.json` → `orgId`)
4. Redeploy → open `/studio` → **Analytics**
5. Invite the website owner under Sanity Manage → **Members**

Vercel reports **visitors** and **pageviews** (plus referrers / countries / devices). It does **not** expose classic bounce rate the way Google Analytics does. On the Hobby plan, the API only returns the latest **31 days** of data (the Studio UI offers 7 / 14 / 30 day ranges).

### Why CRM numbers can differ from the Vercel dashboard

- Studio uses **production** only (preview traffic is excluded).
- Ranges are UTC day boundaries and include **today**.
- Compare the same range (7 / 14 / 30). “All time” in Vercel is still capped by Hobby’s window.

### Keeping history without a paid Vercel plan

Vercel Hobby cannot unlock data older than ~31 days via API/Drains (Drains need Pro). Free approach used here:

1. Nightly cron (`/api/cron/analytics-snapshot`) copies each day’s totals into Sanity (`analyticsDay` documents)
2. Studio **Analytics → Saved history** shows that archive to Sanity members forever
3. Run the cron once after deploy to backfill whatever is still inside the 31-day window

Requires `CRON_SECRET` on Vercel (Production). Data already aged out of Vercel before the first snapshot cannot be recovered.

## Managing enquiries

Every successful website form submission is saved under **Website Enquiries** in Studio. Open an enquiry to view the customer's contact details and message, update its status, and add private follow-up notes.

Email notifications are optional. To enable them, configure a valid `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` in Vercel. Enquiries remain safely stored in Sanity even when an email notification cannot be delivered.

## Publishing workflow

1. **Sign in** to `/studio`
2. Choose a section from the left menu
3. **Edit** text or **upload** a new image (drag & drop)
4. Click **Publish** (top right)
5. The live site updates within seconds when the webhook is configured

### Auto-refresh on the live site

The live site refreshes Sanity content about once per minute automatically.

For **instant** updates after Publish, set `SANITY_REVALIDATE_SECRET` in Vercel and create a Sanity webhook:

1. Open [Sanity Manage → API → Webhooks](https://www.sanity.io/manage/project/zkwbyr44/api/webhooks/create)
2. **URL:** `https://www.gbaircon.co.za/api/revalidate`
3. **Dataset:** production
4. **Trigger:** Create, Update, Delete
5. **Filter:** `_type in ["siteSettings","hero","whyChooseUs","communityOutreach","legacy","dealersSection","reviewsSection","service","galleryImage"]`
6. **Projection:** `{_type}`
7. **Secret:** same value as `SANITY_REVALIDATE_SECRET` in Vercel
8. **HTTP method:** POST

## Tips

- **Alt text:** Always fill in image alt text for accessibility and SEO.
- **Google links:** Paste full URLs from Google Maps / Google Business Profile into Business & Contact Details.
- **Reviews:** Replace placeholder reviews with real verified Google reviews only.
- **Dealer logos:** Upload official SVG/WebP logos; do not use unofficial artwork.
- **Fundraiser copy:** Replace the placeholder message in Community Outreach with the approved narrative.
- **Order fields:** Lower numbers appear first for Services and Gallery Images.

## If Sanity is unavailable

The website falls back to built-in default content so the site never breaks. Once Sanity is back, published content is used automatically.

## Need help?

- Sanity docs: [sanity.io/docs](https://www.sanity.io/docs)
- Local dev issues: try `npm run dev:clean` if the dev server fails on Windows
