type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-16 ${className}`}>
      <p
        className={`text-sm font-bold tracking-wider uppercase mb-2 ${
          dark ? "text-sky-400" : "text-sky-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
