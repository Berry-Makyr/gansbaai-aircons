import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import SitePageShell from "@/components/SitePageShell";
import { getWhatsAppUrl } from "@/data/business";
import { enquiryHref } from "@/data/navigation";
import { getServicePageCopy } from "@/data/serviceCopy";
import { services as defaultServices } from "@/data/services";
import { getHomepageContent, getServiceBySlug, getServices } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  const slugs = new Set([
    ...services.map((s) => s.id),
    ...defaultServices.map((s) => s.id),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const copy = getServicePageCopy(slug);
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: `${SITE_URL}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const [service, home] = await Promise.all([
    getServiceBySlug(slug),
    getHomepageContent(),
  ]);

  if (!service) notFound();

  const copy = getServicePageCopy(slug);
  const { siteSettings, services } = home;

  return (
    <SitePageShell siteSettings={siteSettings} services={services}>
      <article className="pb-20">
        <div className="bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <p className="text-sm font-bold text-sky-400 tracking-wider uppercase mb-3">
              Service
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              What we can help with
            </h2>
            <ul className="space-y-3">
              {copy.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-700 leading-relaxed"
                >
                  <span className="text-sky-500 font-bold" aria-hidden="true">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Serving {siteSettings.serviceArea}
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Based in Gansbaai, we install, service and repair {service.title.toLowerCase()}{" "}
              for homes, farms, hospitality venues and businesses across the Overstrand
              and Overberg. Tell us what you need and we&apos;ll come back with clear
              next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={enquiryHref(service.title)}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 font-semibold transition-colors"
              >
                Enquire about {service.title}
              </Link>
              <a
                href={getWhatsAppUrl(
                  siteSettings.whatsapp.number,
                  `Hi Gansbaai Aircon, I'd like help with ${service.title}.`,
                  siteSettings.whatsapp.defaultMessage
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-sky-400 text-slate-800 px-6 py-3 font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </section>

          <p className="text-sm text-slate-500">
            <Link href="/#services" className="text-sky-600 hover:text-sky-700">
              ← All services
            </Link>
            {" · "}
            <Link href="/service-areas" className="text-sky-600 hover:text-sky-700">
              Service areas
            </Link>
          </p>
        </div>
      </article>
    </SitePageShell>
  );
}
