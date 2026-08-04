import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SitePageShell from "@/components/SitePageShell";
import { getHomepageContent, getPosts } from "@/lib/cms/fetch";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights | Aircon & Refrigeration Tips | Gansbaai Aircon",
  description:
    "Practical tips and local advice on air conditioning, refrigeration and cold-chain care for Gansbaai and the Overberg.",
  alternates: { canonical: `${SITE_URL}/insights` },
};

export default async function InsightsPage() {
  const [{ siteSettings, services }, posts] = await Promise.all([
    getHomepageContent(),
    getPosts(),
  ]);

  return (
    <SitePageShell siteSettings={siteSettings} services={services}>
      <div className="pb-20">
        <div className="bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <p className="text-sm font-bold text-sky-400 tracking-wider uppercase mb-3">
              Insights
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Local HVAC & refrigeration notes
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Short, practical articles for Overberg homes, farms and businesses.
              New posts are published from Sanity Studio.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-800 font-semibold mb-2">
                No posts published yet
              </p>
              <p className="text-slate-600 text-sm max-w-lg mx-auto">
                Open Studio → Insights → Posts to add your first article. Once
                published, it will appear here for search and return visits.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="block h-full rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-sky-300 transition-colors"
                  >
                    {post.mainImage?.url ? (
                      <div className="relative aspect-[16/9] bg-slate-100">
                        <Image
                          src={post.mainImage.url}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 mb-2">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                              dateStyle: "medium",
                            })
                          : "Draft"}
                      </p>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SitePageShell>
  );
}
