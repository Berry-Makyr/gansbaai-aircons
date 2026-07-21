import AirconLogoText from "@/components/AirconLogoText";

type LogoVariant = "hero" | "footer";

type LogoProps = {
  variant: LogoVariant;
  ariaHidden?: boolean;
  className?: string;
};

export default function Logo({
  variant,
  ariaHidden = false,
  className = "",
}: LogoProps) {
  return (
    <span
      className={`brand-logo brand-logo--${variant} ${className}`}
      role={ariaHidden ? undefined : "img"}
      aria-label={
        ariaHidden ? undefined : "Gansbaai Aircon and Refrigeration"
      }
      aria-hidden={ariaHidden || undefined}
    >
      <span className="brand-logo__mark">
        <AirconLogoText idPrefix={variant} />
        <span className="brand-logo__refrigeration">&amp; REFRIGERATION</span>
      </span>
    </span>
  );
}
