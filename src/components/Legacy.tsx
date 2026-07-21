import type { LegacyContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

type LegacyProps = {
  content: LegacyContent;
};

export default function Legacy({ content }: LegacyProps) {
  return (
    <section
      id="legacy"
      className="py-24 bg-slate-900 text-white"
      aria-labelledby="legacy-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          dark
        />

        <ol className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-sky-500/30 -translate-x-1/2"
            aria-hidden="true"
          />

          {content.milestones.map((milestone, index) => (
            <li
              key={`${milestone.year}-${milestone.title}`}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" aria-hidden="true" />

              <div
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-900 -translate-x-1/2 mt-1.5 z-10"
                aria-hidden="true"
              />

              <article className="ml-10 md:ml-0 md:w-1/2 bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                <time
                  dateTime={milestone.year.replace("–", "-")}
                  className="inline-block text-sky-400 font-bold text-sm uppercase tracking-wider mb-2"
                >
                  {milestone.year}
                </time>
                <h3 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {milestone.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
