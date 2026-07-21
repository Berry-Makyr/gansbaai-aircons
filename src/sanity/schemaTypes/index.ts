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
    whyChooseUsItem,
    legacyMilestone,
    dealerItem,
    reviewItem,
  ],
};
