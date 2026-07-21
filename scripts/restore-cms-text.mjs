/**
 * Restore hero + communityOutreach from Sanity History (pre-seed overwrite).
 * Usage: node scripts/restore-cms-text.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing project ID or write token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-11",
  token,
  useCdn: false,
});

const TIME = "2026-07-21T19:00:00.000Z";
const IDS = ["hero", "communityOutreach"];

async function fetchHistory(id) {
  const url = new URL(
    `https://${projectId}.api.sanity.io/v2021-06-07/data/history/${dataset}/documents/${id}`
  );
  url.searchParams.set("time", TIME);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`History fetch failed for ${id}: ${res.status}`);
  }
  const body = await res.json();
  const doc = body.documents?.[0];
  if (!doc) throw new Error(`No historical document for ${id}`);
  return doc;
}

function cleanForReplace(doc) {
  const {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    _system,
    ...rest
  } = doc;
  return { _id, _type, ...rest };
}

async function main() {
  for (const id of IDS) {
    const historical = await fetchHistory(id);
    const restored = cleanForReplace(historical);
    await client.createOrReplace(restored);
    console.log(`✓ Restored ${id} from history @ ${TIME}`);
    if (id === "hero") {
      console.log(`  description preview: ${String(restored.description).slice(0, 120)}...`);
    }
    if (id === "communityOutreach") {
      console.log(`  message preview: ${String(restored.message).slice(0, 120)}...`);
    }
  }
  console.log("\nRestore complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
