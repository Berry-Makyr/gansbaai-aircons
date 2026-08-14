import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-slate-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 italic text-slate-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">{children}</ul>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-sky-600 hover:text-sky-700 underline underline-offset-2"
        rel="noopener noreferrer"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).height(800).fit("max").url();
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
          />
          {value.alt ? (
            <figcaption className="text-sm text-slate-500 mt-2">{value.alt}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PortableBodyProps = {
  value: unknown[];
};

export default function PortableBody({ value }: PortableBodyProps) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
