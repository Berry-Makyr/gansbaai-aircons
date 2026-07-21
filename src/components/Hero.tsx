import Image from "next/image";
import { resolveImageProps } from "@/lib/cms/images";
import type { HeroContent } from "@/lib/cms/types";
import Logo from "@/components/Logo";
import HeroTagline from "@/components/HeroTagline";

type HeroProps = {
  hero: HeroContent;
};

export default function Hero({ hero }: HeroProps) {
  const bg = resolveImageProps(
    hero.backgroundImage,
    hero.backgroundImageAlt,
    1920
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-sky-500/10 z-10" />
        <Image
          src={bg.src}
          alt={bg.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder={bg.blurDataURL ? "blur" : undefined}
          blurDataURL={bg.blurDataURL}
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1
          id="hero-heading"
          aria-label={`${hero.headlinePrefix} Aircon and Refrigeration`}
          className="w-full max-w-4xl mb-3 sm:mb-4 animate-slide-up [animation-delay:400ms] opacity-0"
        >
          <Logo variant="hero" ariaHidden />
        </h1>

        <HeroTagline tagline={hero.tagline} />

        <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed max-w-2xl animate-slide-up [animation-delay:600ms] opacity-0">
          {hero.description}
        </p>
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
