import { getImageProps } from "next/image";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/data/business";
import { resolveImageProps } from "@/lib/cms/images";
import type { HeroContent, SiteSettingsContent } from "@/lib/cms/types";
import Logo from "@/components/Logo";
import HeroTagline from "@/components/HeroTagline";

type HeroProps = {
  hero: HeroContent;
  siteSettings: SiteSettingsContent;
};

export default function Hero({ hero, siteSettings }: HeroProps) {
  const desktop = resolveImageProps(
    hero.backgroundImage,
    hero.backgroundImageAlt,
    1920
  );
  const mobile = resolveImageProps(
    hero.mobileBackgroundImage,
    hero.mobileBackgroundImageAlt,
    1080
  );

  const common = {
    alt: mobile.alt || desktop.alt,
    sizes: "100vw",
    quality: 75,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    alt: desktop.alt,
    src: desktop.src,
    width: desktop.imageWidth || 1920,
    height: desktop.imageHeight || 1080,
  });

  const {
    props: { src: mobileSrc, ...mobileRest },
  } = getImageProps({
    ...common,
    alt: mobile.alt || desktop.alt,
    src: mobile.src,
    width: mobile.imageWidth || 1080,
    height: mobile.imageHeight || 1440,
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-sky-500/10 z-10" />
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line @next/next/no-img-element -- art-directed via <picture> */}
          <img
            {...mobileRest}
            src={mobileSrc}
            alt={mobile.alt || desktop.alt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1
          id="hero-heading"
          className="w-full max-w-4xl mb-3 sm:mb-4 animate-slide-up [animation-delay:400ms] opacity-0"
        >
          <span className="sr-only">
            Gansbaai Aircon and Refrigeration
          </span>
          <Logo variant="hero" ariaHidden />
        </h1>

        <HeroTagline tagline={hero.tagline} />

        <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed max-w-2xl animate-slide-up [animation-delay:600ms] opacity-0">
          {hero.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up [animation-delay:700ms] opacity-0">
          <a
            href="#enquiry-form"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 text-white px-7 py-3.5 text-sm sm:text-base font-semibold shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-0.5"
          >
            {hero.quoteCtaText || "Request a Quote"}
          </a>
          <a
            href={getWhatsAppUrl(
              siteSettings.whatsapp.number,
              undefined,
              siteSettings.whatsapp.defaultMessage
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm sm:text-base font-semibold backdrop-blur-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-sky-500/20 rounded-full blur-[64px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-cyan-500/20 rounded-full blur-[64px] animate-pulse-slow [animation-delay:1s]" />
      </div>
    </section>
  );
}
