import { NextResponse } from "next/server";
import {
  clampAnalyticsRangeDays,
  fetchVercelTrafficSummary,
  isVercelAnalyticsConfigured,
} from "@/lib/vercel-analytics";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;

type RateBucket = { count: number; resetAt: number };

const globalRateStore = globalThis as typeof globalThis & {
  __analyticsRateLimit?: Map<string, RateBucket>;
};

function getRateStore(): Map<string, RateBucket> {
  if (!globalRateStore.__analyticsRateLimit) {
    globalRateStore.__analyticsRateLimit = new Map();
  }
  return globalRateStore.__analyticsRateLimit;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const store = getRateStore();
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || existing.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) return false;
  existing.count += 1;
  store.set(ip, existing);
  return true;
}

/** Light gate: prefer Studio referrer; optional shared secret. */
function isAuthorized(request: Request): boolean {
  const secret = process.env.ANALYTICS_API_SECRET?.trim();
  if (secret) {
    const header = request.headers.get("x-analytics-secret");
    return header === secret;
  }

  const referer = request.headers.get("referer") || "";
  try {
    const url = new URL(referer);
    return url.pathname.startsWith("/studio");
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!checkRateLimit(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429 }
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isVercelAnalyticsConfigured()) {
    return NextResponse.json({
      configured: false,
      error:
        "Vercel Analytics API is not configured. Set VERCEL_API_TOKEN and VERCEL_PROJECT_ID (and VERCEL_TEAM_ID for team projects).",
    });
  }

  const { searchParams } = new URL(request.url);
  const daysParam = Number(searchParams.get("days") || "30");
  const allowed = [7, 14, 30];
  const rangeDays = clampAnalyticsRangeDays(
    allowed.includes(daysParam) ? daysParam : 30
  );

  try {
    const summary = await fetchVercelTrafficSummary(rangeDays);
    return NextResponse.json(summary, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load Vercel analytics";
    return NextResponse.json({ configured: true, error: message }, { status: 502 });
  }
}
