import { PLACEHOLDER_MARKER } from "./business";

export const communityOutreach = {
  title: "Reach for Recovery — Breast Cancer Fundraiser",
  imageSrc: "/gallery/gallery-14.jpg",
  imageAlt:
    "Gansbaai Aircon team supporting the Reach for Recovery breast cancer fundraiser",
  /**
   * PLACEHOLDER — replace with the complete approved fundraiser message.
   */
  message: `${PLACEHOLDER_MARKER}: Complete approved fundraiser message will be inserted here. This section will include the full narrative about Gansbaai Aircon's support for the Reach for Recovery Breast Cancer fundraiser and the Ditto Project.`,
  closingLine:
    "Together, we've not only cooled homes—we've warmed hearts.",
  hashtags: ["#ReachForRecovery", "#BreastCancerAwarenessMonth", "#Gansbaai"],
  galleryImages: [
    "/gallery/gallery-13.jpg",
    "/gallery/gallery-14.jpg",
    "/gallery/gallery-15.jpg",
    "/gallery/gallery-16.jpg",
  ],
} as const;
