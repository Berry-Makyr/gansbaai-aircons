import { Star, ExternalLink, PenLine } from "lucide-react";
import { isPlaceholder } from "@/data/business";
import type { ReviewsSectionContent, SiteSettingsContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

type ReviewsProps = {
  content: ReviewsSectionContent;
  siteSettings: SiteSettingsContent;
};

export default function Reviews({ content, siteSettings }: ReviewsProps) {
  const reviewsUrl = siteSettings.google.reviewsUrl;
  const leaveReviewUrl = siteSettings.google.leaveReviewUrl;
  const hasGoogleLinks =
    !isPlaceholder(reviewsUrl) && !isPlaceholder(leaveReviewUrl);
  const verifiedReviews = content.reviews.filter(
    (review) => !review.isPlaceholder
  );

  return (
    <section id="reviews" className="py-24 bg-slate-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        {verifiedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {verifiedReviews.map((review) => (
              <article key={review.id} className="section-card p-6">
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 mb-4">
                  <p className="text-slate-800 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>
                <footer className="text-sm font-semibold text-slate-600">
                  — {review.author}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="section-card max-w-3xl mx-auto p-7 text-center mb-10">
            <p className="text-slate-700 leading-relaxed">
              Read customer feedback on our Google business listing, or share
              your experience after we have completed a job for you.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasGoogleLinks ? (
            <>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-800 px-6 py-3 rounded-full font-semibold hover:border-sky-300 hover:text-sky-600 transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                View Google Reviews
              </a>
              <a
                href={leaveReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-sky-500/20"
              >
                <PenLine className="w-4 h-4" aria-hidden="true" />
                Leave a Google Review
              </a>
            </>
          ) : (
            <p className="placeholder-marker text-sm" role="note">
              Add Google review links in Studio under Business &amp; Contact
              Details
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
