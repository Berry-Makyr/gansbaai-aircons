import type { Metadata } from "next";
import SitePageShell from "@/components/SitePageShell";
import { getHomepageContent } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Gansbaai Aircon",
  description:
    "Website terms for using Gansbaai Aircon & Refrigeration online content and enquiry forms.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default async function TermsPage() {
  const { siteSettings, services } = await getHomepageContent();

  return (
    <SitePageShell siteSettings={siteSettings} services={services}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-slate-600 mb-8">Last updated: 5 August 2026</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            By using this website you agree to these terms. If you do not agree,
            please do not use the site.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Website information
            </h2>
            <p>
              Content on this site is for general information about our air
              conditioning and refrigeration services. Descriptions may change;
              final scope, pricing and timelines are confirmed in writing for each
              job.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Enquiries</h2>
            <p>
              Submitting the contact form or messaging us via WhatsApp is a request
              for information or a quote — not an automatic booking. We will respond
              as soon as practical during business hours, and triage emergencies
              according to urgency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Acceptable use
            </h2>
            <p>
              Do not misuse this website (including spam, automated abuse of the
              contact form, or attempts to disrupt the service). We may block or
              ignore abusive submissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Liability</h2>
            <p>
              While we aim to keep information accurate, we are not liable for
              decisions made solely on website content. Service work is governed by
              the agreement made for that specific job.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-sky-600 hover:text-sky-700"
              >
                {siteSettings.email}
              </a>{" "}
              · {siteSettings.phone.display}
            </p>
          </section>
        </div>
      </div>
    </SitePageShell>
  );
}
