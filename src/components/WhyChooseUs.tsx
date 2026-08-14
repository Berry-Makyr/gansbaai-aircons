import {
  Calendar,
  Users,
  Handshake,
  Award,
  PhoneCall,
  Building2,
  MapPin,
} from "lucide-react";
import type { WhyChooseUsContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

const affiliations = [
  {
    name: "SARACCA",
    href: "https://www.saracca.co.za/",
    src: "/affiliations/saracca.png",
    width: 200,
    height: 140,
  },
  {
    name: "SAQCC Gas",
    href: "https://saqccgas.co.za/",
    src: "/affiliations/saqcc-gas.svg",
    width: 200,
    height: 72,
  },
] as const;

const icons = [
  Calendar,
  Users,
  Handshake,
  Award,
  PhoneCall,
  Building2,
  MapPin,
] as const;

type WhyChooseUsProps = {
  content: WhyChooseUsContent;
};

function toBullets(description: string): string[] {
  return description
    .split(/\n|•|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  return (
    <section id="why-us" className="pt-24 pb-8 bg-white" aria-labelledby="why-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-us-heading"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const bullets = toBullets(item.description);

            return (
              <article
                key={item.title}
                className="section-card p-6 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/80 shadow-[0_0_16px_rgb(56_189_248_/_0.18)] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sky-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-1.5 text-slate-700 text-sm leading-relaxed">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-500 shadow-[0_0_8px_rgb(56_189_248_/_0.8)]"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-sky-600 mb-2">
            Qualifications
          </p>
          <p className="text-center text-lg sm:text-xl font-bold text-slate-900 mb-5">
            Fully qualified Refrigeration artisan
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {affiliations.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
