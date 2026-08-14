import { readFile } from "fs/promises";
import path from "path";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const file = path.join(process.cwd(), "public/brand/favicon-192.png");
  const data = await readFile(file);
  return new Response(data, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
