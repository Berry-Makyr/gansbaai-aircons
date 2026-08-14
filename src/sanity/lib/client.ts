import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Published-content client. Keep a token while the dataset is private
 * (production still writes enquiries to Sanity). After production cutover,
 * drop the token so reads hit the public CDN.
 */
const readToken =
  process.env.SANITY_API_READ_TOKEN?.trim() ||
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  "";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  ...(readToken ? { token: readToken } : {}),
});
