/**
 * Copy Sanity enquiry documents into Neon, then delete them from Sanity.
 *
 *   node scripts/migrate-enquiries-to-neon.mjs
 *   node scripts/migrate-enquiries-to-neon.mjs --delete
 */
import { createClient } from "@sanity/client";
import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const databaseUrl = process.env.DATABASE_URL;
const shouldDelete = process.argv.includes("--delete");

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
}
if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL");
}

const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-11",
  token,
  useCdn: false,
});

const sql = neon(databaseUrl);

const docs = await sanity.fetch(
  `*[_type == "enquiry"]{
    _id, status, submittedAt, name, email, phone, service, message, internalNotes
  }`
);

console.log(`Found ${docs.length} Sanity enquiry document(s)`);

await sql`
  CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    internal_notes TEXT NOT NULL DEFAULT '',
    sanity_id TEXT UNIQUE
  )
`;

let upserted = 0;
for (const doc of docs) {
  await sql`
    INSERT INTO enquiries (
      submitted_at, name, email, phone, service, message, status, internal_notes, sanity_id
    ) VALUES (
      ${doc.submittedAt || new Date().toISOString()},
      ${doc.name || "Unnamed"},
      ${doc.email || ""},
      ${doc.phone || ""},
      ${doc.service || "General Inquiry"},
      ${doc.message || ""},
      ${doc.status || "new"},
      ${doc.internalNotes || ""},
      ${doc._id}
    )
    ON CONFLICT (sanity_id) DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      service = EXCLUDED.service,
      message = EXCLUDED.message,
      status = EXCLUDED.status,
      internal_notes = EXCLUDED.internal_notes
  `;
  upserted += 1;
}

console.log(`Upserted ${upserted} row(s) into Neon`);

if (shouldDelete && docs.length) {
  const ids = docs.map((doc) => doc._id);
  const transaction = sanity.transaction();
  for (const id of ids) transaction.delete(id);
  await transaction.commit();
  console.log(`Deleted ${ids.length} Sanity enquiry document(s)`);
} else if (docs.length) {
  console.log("Sanity documents left in place. Re-run with --delete after verifying Neon.");
}
