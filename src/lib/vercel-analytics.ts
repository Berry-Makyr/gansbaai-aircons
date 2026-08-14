/** Hobby plan Web Analytics reporting window (Vercel). */
export const VERCEL_ANALYTICS_MAX_DAYS = 31;

export type VercelCountData = {
  pageviews: number;
  visitors: number;
};

export type VercelDayRow = {
  timestamp: string;
  pageviews: number;
  visitors: number;
};

export type VercelDimensionRow = {
  key: string;
  pageviews: number;
  visitors: number;
};

export type VercelTrafficSummary = {
  configured: boolean;
  rangeDays: number;
  since: string;
  until: string;
  totals: VercelCountData;
  previousTotals: VercelCountData | null;
  byDay: VercelDayRow[];
  topReferrers: VercelDimensionRow[];
  topCountries: VercelDimensionRow[];
  devices: VercelDimensionRow[];
};

type VercelEnv = {
  token: string;
  projectId: string;
  teamId?: string;
};

function getVercelEnv(): VercelEnv | null {
  const token = process.env.VERCEL_API_TOKEN?.trim();
  const projectId =
    process.env.VERCEL_PROJECT_ID?.trim() ||
    process.env.VERCEL_ANALYTICS_PROJECT_ID?.trim();
  const teamId =
    process.env.VERCEL_TEAM_ID?.trim() ||
    process.env.VERCEL_ORG_ID?.trim() ||
    undefined;

  if (!token || !projectId) return null;
  return { token, projectId, teamId };
}

/** UTC midnight for `daysAgo` days before today (0 = today 00:00). */
export function utcDayStart(daysAgo: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString();
}

/**
 * Exclusive end bound for Vercel day-granularity queries.
 * Use tomorrow 00:00 UTC so "today" is included (passing `until=now`
 * gets truncated to today 00:00 and drops the current day).
 */
export function utcExclusiveUntil(daysAgoEnd = 0): string {
  return utcDayStart(daysAgoEnd - 1);
}

export function dayKeyFromTimestamp(timestamp: string): string {
  return timestamp.slice(0, 10);
}

export function clampAnalyticsRangeDays(days: number): number {
  if (!Number.isFinite(days) || days <= 0) return 7;
  return Math.min(Math.floor(days), VERCEL_ANALYTICS_MAX_DAYS);
}

async function vercelGet<T>(
  path: string,
  env: VercelEnv,
  params: Record<string, string | undefined>
): Promise<T> {
  const url = new URL(`https://api.vercel.com${path}`);
  url.searchParams.set("projectId", env.projectId);
  if (env.teamId) url.searchParams.set("teamId", env.teamId);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env.token}` },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Vercel Analytics API ${response.status}: ${body.slice(0, 300) || response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function mapDimensionRows(
  rows: Array<Record<string, unknown>> | undefined,
  keyField: string
): VercelDimensionRow[] {
  if (!rows?.length) return [];
  return rows
    .map((row) => ({
      key: String(row[keyField] ?? row.value ?? "Unknown"),
      pageviews: asNumber(row.pageviews),
      visitors: asNumber(row.visitors),
    }))
    .filter((row) => row.key && row.key !== "null")
    .slice(0, 8);
}

export function isVercelAnalyticsConfigured(): boolean {
  return getVercelEnv() !== null;
}

export async function fetchVercelTrafficSummary(
  requestedDays = 30
): Promise<VercelTrafficSummary> {
  const rangeDays = clampAnalyticsRangeDays(requestedDays);
  const env = getVercelEnv();

  if (!env) {
    return {
      configured: false,
      rangeDays,
      since: utcDayStart(rangeDays),
      until: utcExclusiveUntil(0),
      totals: { pageviews: 0, visitors: 0 },
      previousTotals: null,
      byDay: [],
      topReferrers: [],
      topCountries: [],
      devices: [],
    };
  }

  // Inclusive start … exclusive end (tomorrow) so today is counted.
  const since = utcDayStart(rangeDays - 1);
  const until = utcExclusiveUntil(0);
  const productionFilter = "environment eq 'production'";

  // Prior-period compare must also stay inside the Hobby 31-day window.
  const canComparePrevious = rangeDays * 2 <= VERCEL_ANALYTICS_MAX_DAYS;
  const previousSince = utcDayStart(rangeDays * 2 - 1);
  const previousUntil = utcDayStart(rangeDays - 1);

  const [totalsRes, previousRes, byDayRes, referrersRes, countriesRes, devicesRes] =
    await Promise.all([
      vercelGet<{ data?: VercelCountData }>(
        "/v1/query/web-analytics/visits/count",
        env,
        { since, until, filter: productionFilter }
      ),
      canComparePrevious
        ? vercelGet<{ data?: VercelCountData }>(
            "/v1/query/web-analytics/visits/count",
            env,
            {
              since: previousSince,
              until: previousUntil,
              filter: productionFilter,
            }
          )
        : Promise.resolve(null),
      vercelGet<{ data?: Array<Record<string, unknown>> }>(
        "/v1/query/web-analytics/visits/aggregate",
        env,
        { since, until, by: "day", filter: productionFilter }
      ),
      vercelGet<{ data?: Array<Record<string, unknown>> }>(
        "/v1/query/web-analytics/visits/aggregate",
        env,
        {
          since,
          until,
          by: "referrerHostname",
          limit: "8",
          filter: productionFilter,
        }
      ),
      vercelGet<{ data?: Array<Record<string, unknown>> }>(
        "/v1/query/web-analytics/visits/aggregate",
        env,
        {
          since,
          until,
          by: "country",
          limit: "8",
          filter: productionFilter,
        }
      ),
      vercelGet<{ data?: Array<Record<string, unknown>> }>(
        "/v1/query/web-analytics/visits/aggregate",
        env,
        {
          since,
          until,
          by: "deviceType",
          limit: "8",
          filter: productionFilter,
        }
      ),
    ]);

  const byDay: VercelDayRow[] = (byDayRes.data || [])
    .map((row) => ({
      timestamp: String(row.timestamp || ""),
      pageviews: asNumber(row.pageviews),
      visitors: asNumber(row.visitors),
    }))
    .filter((row) => row.timestamp);

  return {
    configured: true,
    rangeDays,
    since,
    until,
    totals: {
      pageviews: asNumber(totalsRes.data?.pageviews),
      visitors: asNumber(totalsRes.data?.visitors),
    },
    previousTotals: previousRes
      ? {
          pageviews: asNumber(previousRes.data?.pageviews),
          visitors: asNumber(previousRes.data?.visitors),
        }
      : null,
    byDay,
    topReferrers: mapDimensionRows(referrersRes.data, "referrerHostname"),
    topCountries: mapDimensionRows(countriesRes.data, "country"),
    devices: mapDimensionRows(devicesRes.data, "deviceType"),
  };
}

/** Fetch daily rows for snapshot/backfill (production only). */
export async function fetchVercelDailyRows(
  rangeDays = VERCEL_ANALYTICS_MAX_DAYS
): Promise<VercelDayRow[]> {
  const env = getVercelEnv();
  if (!env) return [];

  const days = clampAnalyticsRangeDays(rangeDays);
  const since = utcDayStart(days - 1);
  const until = utcExclusiveUntil(0);

  const byDayRes = await vercelGet<{ data?: Array<Record<string, unknown>> }>(
    "/v1/query/web-analytics/visits/aggregate",
    env,
    {
      since,
      until,
      by: "day",
      filter: "environment eq 'production'",
    }
  );

  return (byDayRes.data || [])
    .map((row) => ({
      timestamp: String(row.timestamp || ""),
      pageviews: asNumber(row.pageviews),
      visitors: asNumber(row.visitors),
    }))
    .filter((row) => row.timestamp);
}
