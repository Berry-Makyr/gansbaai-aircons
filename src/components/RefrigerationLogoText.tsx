type RefrigerationLogoTextProps = {
  className?: string;
  idPrefix?: string;
};

/**
 * Hand-edited Snow Caps SVG (Inkscape) — blue letters + white snow fills.
 */
export default function RefrigerationLogoText({
  className = "",
}: RefrigerationLogoTextProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/refrigeration.svg"
      alt=""
      className={`brand-logo__refrigeration ${className}`}
      aria-hidden="true"
      draggable={false}
    />
  );
}
