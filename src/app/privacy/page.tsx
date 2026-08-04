import type { Metadata } from "next";
import SitePageShell from "@/components/SitePageShell";
import { getHomepageContent } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Gansbaai Aircon",
  description:
    "How Gansbaai Aircon & Refrigeration collects and uses enquiry and website information.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default async function PrivacyPage() {
  const { siteSettings, services } = await getHomepageContent();

  return (
    <SitePageShell siteSettings={siteSettings} services={services}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 prose-slate">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-slate-600 mb-8">
          Last updated: 5 August 2026
        </p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Gansbaai Aircon &amp; Refrigeration CC (&quot;we&quot;, &quot;us&quot;)
            respects your privacy. This policy explains what information we collect
            through {SITE_URL.replace("https://", "")} and how we use it.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Information we collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Enquiry details you submit (name, email, optional phone, service
                interest, and message).
              </li>
              <li>
                Basic website analytics (such as page views and referrers) via
                Vercel Analytics — aggregated and not used to identify you personally.
              </li>
              <li>
                Technical logs needed to operate and secure the website (for example
                IP-based rate limiting on the contact form).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              How we use information
            </h2>
            <p>
              We use enquiry details only to respond to your request, provide quotes
              or service, and keep internal follow-up notes. We do not sell your
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Storage and access
            </h2>
            <p>
              Enquiries are stored in our private CMS (Sanity) and may also be emailed
              to our business inbox. Access is limited to authorised team members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your choices</h2>
            <p>
              To ask about the personal information you have sent us, or to request
              correction or deletion where appropriate, email{" "}
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-sky-600 hover:text-sky-700"
              >
                {siteSettings.email}
              </a>{" "}
              or call {siteSettings.phone.display}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Updates</h2>
            <p>
              We may update this policy from time to time. The latest version will
              always be published on this page.
            </p>
          </section>
        </div>
      </div>
    </SitePageShell>
  );
}
