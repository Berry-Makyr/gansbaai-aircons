import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableBody from "@/components/PortableBody";
import SitePageShell from "@/components/SitePageShell";
import { enquiryHref } from "@/data/navigation";
import {
  getHomepageContent,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gansbaai Aircon Insights`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/insights/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/insights/${slug}`,
      type: "article",
      images: post.mainImage?.url
        ? [{ url: post.mainImage.url, alt: post.mainImage.alt || post.title }]
        : undefined,
    },
  };
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, home] = await Promise.all([
    getPostBySlug(slug),
    getHomepageContent(),
  ]);

  if (!post) notFound();

  return (
    <SitePageShell
      siteSettings={home.siteSettings}
      services={home.services}
    >
      <article className="pb-20">
        <div className="bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <p className="text-sm font-bold text-sky-400 tracking-wider uppercase mb-3">
              <Link href="/insights" className="hover:text-sky-300">
                Insights
              </Link>
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-slate-300 text-sm">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                    dateStyle: "long",
                  })
                : null}
              {post.authorName ? ` · ${post.authorName}` : null}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {post.mainImage?.url ? (
            <div className="relative aspect-[16/9] mb-10 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
                priority
              />
            </div>
          ) : null}

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <PortableBody value={post.body || []} />

          <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-800 font-semibold">
              Need help with a system on site?
            </p>
            <Link
              href={enquiryHref()}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 font-semibold transition-colors"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </article>
    </SitePageShell>
  );
}
