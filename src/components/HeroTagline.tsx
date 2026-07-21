"use client";

type HeroTaglineProps = {
  tagline: string;
};

export default function HeroTagline({ tagline }: HeroTaglineProps) {
  return (
    <div className="hero-tagline mb-3 sm:mb-4 max-w-2xl">
      <p className="hero-tagline__text text-sm sm:text-base md:text-lg font-medium italic text-slate-300">
        {tagline}
      </p>
      <svg
        className="hero-tagline__swoosh"
        viewBox="0 0 420 18"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Tapered red arc: thicker on the left, sharp point on the right */}
        <path
          d="M6 10.5C72 3.5 148 1.5 220 3C290 4.5 355 8.5 414 12.2L414 12.8C352 9.2 288 5.5 220 4.2C148 2.8 72 4.8 6 11.2Z"
          fill="#e31e24"
          className="hero-tagline__swoosh-fill"
        />
      </svg>
    </div>
  );
}
