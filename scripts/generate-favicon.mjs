import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SIZE = 512;
const PAD = 28;

const SOURCE_CANDIDATES = [
  path.join(ROOT, "public/brand/favicon-source.png"),
  path.join(ROOT, "public/brand/favicon-source.jpg"),
  // Fallback: Cursor-saved upload from chat
  "C:/Users/Jean-Pierre/.cursor/projects/g-GansbaaiAircon/assets/c__Users_Jean-Pierre_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-e4c24946-66a4-4081-aca0-37e922195c1d.png",
];

function pngToIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (const item of pngBuffers) {
    entries.push({ size: item.size, buffer: item.buffer, offset });
    offset += item.buffer.length;
  }
  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);
  let entryPos = 6;
  for (const e of entries) {
    out[entryPos] = e.size >= 256 ? 0 : e.size;
    out[entryPos + 1] = e.size >= 256 ? 0 : e.size;
    out[entryPos + 2] = 0;
    out[entryPos + 3] = 0;
    out.writeUInt16LE(1, entryPos + 4);
    out.writeUInt16LE(32, entryPos + 6);
    out.writeUInt32LE(e.buffer.length, entryPos + 8);
    out.writeUInt32LE(e.offset, entryPos + 12);
    e.buffer.copy(out, e.offset);
    entryPos += 16;
  }
  return out;
}

const sourcePath = SOURCE_CANDIDATES.find((p) => fs.existsSync(p));
if (!sourcePath) {
  console.error("No favicon source image found.");
  process.exit(1);
}

// Persist a project-owned copy so regenerating doesn't depend on Cursor assets.
const brandedSource = path.join(ROOT, "public/brand/favicon-source.png");
if (path.resolve(sourcePath) !== path.resolve(brandedSource)) {
  await sharp(sourcePath).png().toFile(brandedSource);
}

// Trim excess white, then place centered on a white square.
const trimmed = await sharp(brandedSource)
  .trim({ threshold: 12 })
  .png()
  .toBuffer();

const fit = SIZE - PAD * 2;
const fitted = await sharp(trimmed)
  .resize({
    width: fit,
    height: fit,
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toBuffer();

const fittedMeta = await sharp(fitted).metadata();
const master = await sharp({
  create: {
    width: SIZE,
    height: SIZE,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: fitted,
      top: Math.round((SIZE - fittedMeta.height) / 2),
      left: Math.round((SIZE - fittedMeta.width) / 2),
    },
  ])
  .png()
  .toBuffer();

const sizes = [48, 96, 192, 256, 512];
const icoFrames = [];
for (const size of sizes) {
  const buffer = await sharp(master).resize(size, size).png().toBuffer();
  if (size !== 512) icoFrames.push({ size, buffer });
  fs.writeFileSync(path.join(ROOT, `public/brand/favicon-${size}.png`), buffer);
}
fs.writeFileSync(path.join(ROOT, "public/brand/favicon-512.png"), master);

const ico = pngToIco(icoFrames);
fs.writeFileSync(path.join(ROOT, "src/app/favicon.ico"), ico);
fs.writeFileSync(path.join(ROOT, "public/favicon.ico"), ico);

console.log("Favicon built from provided logo image", {
  source: brandedSource,
  icoBytes: ico.length,
  masterBytes: master.length,
});
