import Image from "next/image";
import { resolveImageProps } from "@/lib/cms/images";
import type { DealersSectionContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

type ApprovedDealersProps = {
  content: DealersSectionContent;
};

export default function ApprovedDealers({ content }: ApprovedDealersProps) {
  return (
    <section id="dealers" className="py-24 bg-white" aria-labelledby="dealers-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {content.dealers.map((dealer) => {
            const logo = dealer.logo
              ? resolveImageProps(dealer.logo, dealer.logoAlt, 320)
              : null;

            return (
              <div
                key={dealer.name}
                className="section-card flex items-center justify-center h-28 p-5 hover:-translate-y-1"
                title={dealer.name}
              >
                {logo?.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={64}
                    className="object-contain max-h-14 w-auto"
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-lg font-bold text-slate-400 tracking-wide">
                      {dealer.name}
                    </span>
                    <p className="text-xs text-amber-600 mt-1 font-medium">
                      Logo pending
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
