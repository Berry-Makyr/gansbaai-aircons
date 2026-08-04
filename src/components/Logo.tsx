import AirconLogoText from "@/components/AirconLogoText";
import RefrigerationLogoText from "@/components/RefrigerationLogoText";

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
        <span className="brand-logo__top">GANSBAAI</span>
        <AirconLogoText idPrefix={variant} />
        <RefrigerationLogoText idPrefix={variant} />
      </span>
    </span>
  );
}
