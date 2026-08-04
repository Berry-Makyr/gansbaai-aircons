import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-side Sanity client. Uses a read (or write) token so the dataset can
 * remain private — enquiry PII is not queryable without authentication.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token:
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_WRITE_TOKEN,
});
