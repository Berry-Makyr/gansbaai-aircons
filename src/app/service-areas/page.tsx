import type { Metadata } from "next";
import Link from "next/link";
import SitePageShell from "@/components/SitePageShell";
import { enquiryHref } from "@/data/navigation";
import { serviceAreaTowns, serviceAreasIntro } from "@/data/serviceAreas";
import { getHomepageContent } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Gansbaai, Overstrand & Overberg | Gansbaai Aircon",
  description:
    "Air conditioning and refrigeration services across Gansbaai, Hermanus, Stanford, Pearly Beach, Overberg farms and the local fishing industry.",
  alternates: { canonical: `${SITE_URL}/service-areas` },
};

export default async function ServiceAreasPage() {
  const { siteSettings, services } = await getHomepageContent();

  return (
    <SitePageShell siteSettings={siteSettings} services={services}>
      <div className="pb-20">
        <div className="bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <p className="text-sm font-bold text-sky-400 tracking-wider uppercase mb-3">
              Coverage
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Service areas across the Overberg
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              {serviceAreasIntro}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {serviceAreaTowns.map((town) => (
              <div
                key={town.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {town.name}
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {town.blurb}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-sky-50 border border-sky-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Need a technician nearby?
              </h2>
              <p className="text-slate-700">
                Tell us your town and the job — we&apos;ll respond promptly.
              </p>
            </div>
            <Link
              href={enquiryHref()}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 font-semibold transition-colors shrink-0"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </SitePageShell>
  );
}
