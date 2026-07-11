import { type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { heroType } from "./hero";
import { serviceType } from "./service";
import { galleryImageType } from "./galleryImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, heroType, serviceType, galleryImageType],
};
