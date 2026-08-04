import { readFile } from "fs/promises";
import path from "path";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

/**
 * Serves the generated full-stack logo favicon (white background).
 * Static PNG is produced by `node scripts/generate-favicon.mjs`.
 */
export default async function Icon() {
  const file = path.join(process.cwd(), "public/brand/favicon-512.png");
  const data = await readFile(file);
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
