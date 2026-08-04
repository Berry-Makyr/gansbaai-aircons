import { type SchemaTypeDefinition } from "sanity";

import { siteSettingsType } from "./siteSettings";
import { heroType } from "./hero";
import { whyChooseUsType } from "./whyChooseUs";
import { communityOutreachType } from "./communityOutreach";
import { legacyType } from "./legacy";
import { dealersSectionType } from "./dealersSection";
import { reviewsSectionType } from "./reviewsSection";
import { serviceType } from "./service";
import { galleryImageType } from "./galleryImage";
import { enquiryType } from "./enquiry";
import { analyticsDayType } from "./analyticsDay";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { authorType } from "./authorType";
import { postType } from "./postType";
import {
  whyChooseUsItem,
  legacyMilestone,
  dealerItem,
  reviewItem,
} from "./objects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    heroType,
    whyChooseUsType,
    communityOutreachType,
    legacyType,
    dealersSectionType,
    reviewsSectionType,
    serviceType,
    galleryImageType,
    enquiryType,
    analyticsDayType,
    blockContentType,
    categoryType,
    authorType,
    postType,
    whyChooseUsItem,
    legacyMilestone,
    dealerItem,
    reviewItem,
  ],
};
