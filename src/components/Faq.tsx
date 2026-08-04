import { faqItems } from "@/data/faq";
import SectionHeading from "@/components/SectionHeading";

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-heading"
          eyebrow="Common Questions"
          title="Quick answers before you call"
          description="Straight answers about coverage, emergencies, quotes, and the systems we look after across the Overberg."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50 open:bg-white open:shadow-sm transition-colors"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span
                  className="text-sky-500 text-xl leading-none transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-slate-700 text-sm sm:text-base leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
