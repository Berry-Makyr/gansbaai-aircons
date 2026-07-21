import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { isPlaceholder } from "@/data/business";
import type { SiteSettingsContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

type LocationMapProps = {
  siteSettings: SiteSettingsContent;
};

export default function LocationMap({ siteSettings }: LocationMapProps) {
  const { mapsEmbedUrl, mapsDirectionsUrl, mapsOpenUrl } = siteSettings.google;
  const hasEmbed = !isPlaceholder(mapsEmbedUrl);
  const hasDirections = !isPlaceholder(mapsDirectionsUrl);
  const hasOpenUrl = !isPlaceholder(mapsOpenUrl);

  return (
    <section id="location" className="py-24 bg-white" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Find Us"
          title="Visit Gansbaai Aircon"
          description="Conveniently located to serve Gansbaai and the surrounding Overberg and Overstrand communities."
        />

        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          {hasEmbed ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[320px] bg-slate-100">
              <iframe
                src={mapsEmbedUrl}
                title="Gansbaai Aircon location on Google Maps"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-100 flex items-center justify-center"
              role="note"
            >
              <div className="text-center p-8">
                <MapPin
                  className="w-12 h-12 text-slate-400 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="placeholder-marker text-sm max-w-md mx-auto">
                  Add your Google Maps embed URL in Studio under Business &amp;
                  Contact Details
                </p>
                <p className="text-slate-600 mt-4">{siteSettings.address.full}</p>
              </div>
            </div>
          )}

          <div className="bg-slate-50 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 text-slate-700">
              <MapPin
                className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <address className="not-italic">
                {siteSettings.address.line1}
                <br />
                {siteSettings.address.line2}
              </address>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {hasDirections ? (
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-full font-semibold transition-all text-sm"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  Get Directions
                </a>
              ) : (
                <span className="placeholder-marker text-xs px-3 py-2 rounded-full">
                  Directions URL pending
                </span>
              )}
              {hasOpenUrl ? (
                <a
                  href={mapsOpenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 px-5 py-2.5 rounded-full font-semibold hover:border-sky-300 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Open in Google Maps
                </a>
              ) : (
                <span className="placeholder-marker text-xs px-3 py-2 rounded-full">
                  Maps URL pending
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
