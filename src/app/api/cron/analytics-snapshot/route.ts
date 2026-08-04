import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import {
  dayKeyFromTimestamp,
  fetchVercelDailyRows,
  isVercelAnalyticsConfigured,
  VERCEL_ANALYTICS_MAX_DAYS,
} from "@/lib/vercel-analytics";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const runtime = "nodejs";

function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const auth = request.headers.get("authorization");
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;

  // Allow manual backfill from Studio/dev with the analytics gate secret.
  const analyticsSecret = process.env.ANALYTICS_API_SECRET?.trim();
  if (
    analyticsSecret &&
    request.headers.get("x-analytics-secret") === analyticsSecret
  ) {
    return true;
  }

  // Local/dev convenience when secrets are not set.
  if (process.env.NODE_ENV === "development" && !cronSecret) return true;

  const ua = request.headers.get("user-agent") || "";
  return ua.includes("vercel-cron");
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN for analytics snapshots");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isVercelAnalyticsConfigured()) {
    return NextResponse.json(
      { error: "Vercel Analytics API is not configured" },
      { status: 503 }
    );
  }

  try {
    const rows = await fetchVercelDailyRows(VERCEL_ANALYTICS_MAX_DAYS);
    const client = getWriteClient();
    const capturedAt = new Date().toISOString();
    let upserted = 0;

    for (const row of rows) {
      const date = dayKeyFromTimestamp(row.timestamp);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;

      await client.createOrReplace({
        _id: `analyticsDay-${date}`,
        _type: "analyticsDay",
        date,
        visitors: row.visitors,
        pageviews: row.pageviews,
        source: "vercel",
        capturedAt,
      });
      upserted += 1;
    }

    return NextResponse.json({
      ok: true,
      upserted,
      capturedAt,
      message:
        "Daily Vercel totals saved to Sanity. These keep working after Hobby's 31-day API window expires.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Snapshot failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
