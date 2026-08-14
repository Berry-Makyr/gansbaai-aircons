"use client";

import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { apiVersion } from "../../env";
import styles from "./analyticsTool.module.css";

type EnquiryStatus = "new" | "contacted" | "completed" | "spam";

type EnquiryRow = {
  id: string;
  name?: string;
  service?: string;
  status?: EnquiryStatus;
  submittedAt?: string;
};

type EnquiryStats = {
  total: number;
  newCount: number;
  contacted: number;
  completed: number;
  spam: number;
  last7Days: number;
  last30Days: number;
  recent: EnquiryRow[];
  byService: { service: string; count: number }[];
};

type TrafficSummary = {
  configured: boolean;
  rangeDays: number;
  totals: { pageviews: number; visitors: number };
  previousTotals: { pageviews: number; visitors: number } | null;
  byDay: { timestamp: string; pageviews: number; visitors: number }[];
  topReferrers: { key: string; pageviews: number; visitors: number }[];
  topCountries: { key: string; pageviews: number; visitors: number }[];
  devices: { key: string; pageviews: number; visitors: number }[];
  error?: string;
};

type ArchiveDay = {
  date: string;
  visitors: number;
  pageviews: number;
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDay(value: string) {
  return new Date(value).toLocaleDateString("en-ZA", {
    month: "short",
    day: "numeric",
  });
}

function percentChange(current: number, previous: number): string | null {
  if (previous <= 0 && current <= 0) return null;
  if (previous <= 0) return "+100%";
  const delta = Math.round(((current - previous) / previous) * 100);
  return `${delta > 0 ? "+" : ""}${delta}%`;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {hint ? <p className={styles.statHint}>{hint}</p> : null}
    </div>
  );
}

function DimensionList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: { key: string; pageviews: number; visitors: number }[];
  empty: string;
}) {
  return (
    <div className={styles.panel}>
      <h4 className={styles.panelTitle}>{title}</h4>
      {rows.length === 0 ? (
        <p className={styles.muted}>{empty}</p>
      ) : (
        <ul className={styles.list}>
          {rows.map((row) => (
            <li key={row.key} className={styles.listRow}>
              <span>{row.key || "Direct / unknown"}</span>
              <span className={styles.badge}>
                {row.visitors} vis · {row.pageviews} views
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AnalyticsTool() {
  const client = useClient({ apiVersion });
  const [stats, setStats] = useState<EnquiryStats | null>(null);
  const [traffic, setTraffic] = useState<TrafficSummary | null>(null);
  const [archive, setArchive] = useState<ArchiveDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [trafficError, setTrafficError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [rangeDays, setRangeDays] = useState<7 | 14 | 30>(14);

  useEffect(() => {
    let cancelled = false;

    async function loadEnquiries() {
      setLoading(true);
      setError(null);

      try {
        const token = client.config().token;
        const response = await fetch("/api/crm/enquiries?stats=1", {
          credentials: "same-origin",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const result = (await response.json()) as EnquiryStats & {
          error?: string;
        };
        if (!response.ok) {
          throw new Error(result.error || "Failed to load enquiry stats");
        }
        if (cancelled) return;
        setStats(result);

        const archiveRows = await client.fetch<ArchiveDay[]>(
          `*[_type == "analyticsDay"] | order(date desc) [0...120] {
            date, visitors, pageviews
          }`
        );
        if (!cancelled) setArchive(archiveRows || []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load enquiry stats"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadEnquiries();
    return () => {
      cancelled = true;
    };
  }, [client]);

  useEffect(() => {
    let cancelled = false;

    async function loadTraffic() {
      setTrafficLoading(true);
      setTrafficError(null);

      try {
        const response = await fetch(`/api/analytics/summary?days=${rangeDays}`, {
          credentials: "same-origin",
        });
        const data = (await response.json()) as TrafficSummary & {
          error?: string;
        };

        if (cancelled) return;

        if (!response.ok && data.error) {
          setTrafficError(data.error);
          setTraffic(null);
          return;
        }

        setTraffic(data);
        if (data.configured && data.error) setTrafficError(data.error);
      } catch (err) {
        if (!cancelled) {
          setTrafficError(
            err instanceof Error ? err.message : "Failed to load traffic stats"
          );
        }
      } finally {
        if (!cancelled) setTrafficLoading(false);
      }
    }

    void loadTraffic();
    return () => {
      cancelled = true;
    };
  }, [rangeDays]);

  const maxDayViews = Math.max(1, ...(traffic?.byDay.map((d) => d.pageviews) || [1]));
  const visitorsChange =
    traffic?.previousTotals != null
      ? percentChange(traffic.totals.visitors, traffic.previousTotals.visitors)
      : null;
  const viewsChange =
    traffic?.previousTotals != null
      ? percentChange(traffic.totals.pageviews, traffic.previousTotals.pageviews)
      : null;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>Website Analytics</h2>
        <p className={styles.lede}>
          Visible only to Sanity project members (same login as the CRM). Live
          traffic comes from Vercel (production). Daily totals are also copied
          into Sanity so history stays available after Vercel&apos;s free 31-day
          API window — no paid Vercel plan required.
        </p>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Traffic (Vercel)</h3>

        <div className={styles.rangeRow}>
          {([7, 14, 30] as const).map((days) => (
            <button
              key={days}
              type="button"
              className={`${styles.rangeButton} ${rangeDays === days ? styles.rangeButtonActive : ""}`}
              onClick={() => setRangeDays(days)}
            >
              Last {days} days
            </button>
          ))}
        </div>

        {trafficLoading ? (
          <p className={styles.muted}>Loading Vercel traffic…</p>
        ) : null}

        {trafficError ? <p className={styles.error}>{trafficError}</p> : null}

        {traffic && !traffic.configured ? (
          <div className={styles.setupCard}>
            <p className={styles.rowTitle}>Connect Vercel Analytics</p>
            <p className={styles.muted}>
              The site already collects Vercel Web Analytics. To show those numbers
              here for you and the website owner, add a Vercel API token on the
              project (one-time, on your account — the client does not need Vercel
              access):
            </p>
            <ol className={styles.setupList}>
              <li>
                Create a token at{" "}
                <a
                  href="https://vercel.com/account/tokens"
                  target="_blank"
                  rel="noreferrer"
                >
                  vercel.com/account/tokens
                </a>
              </li>
              <li>
                In Vercel → Project → Settings → Environment Variables, set{" "}
                <code>VERCEL_API_TOKEN</code>
              </li>
              <li>
                Set <code>VERCEL_TEAM_ID</code> to{" "}
                <code>team_yI22FPqZ9EsGBGPj5K2aIhrT</code> (team projects need
                this). <code>VERCEL_PROJECT_ID</code> is usually injected
                automatically.
              </li>
              <li>Redeploy. Refresh this Analytics tab.</li>
            </ol>
            <p className={styles.muted}>
              Note: Vercel Web Analytics reports visitors and pageviews (not classic
              bounce rate). Bounce-rate work stays a separate UX task on the public
              site.
            </p>
          </div>
        ) : null}

        {traffic?.configured ? (
          <>
            <div className={styles.statGrid}>
              <StatCard
                label="Visitors"
                value={traffic.totals.visitors.toLocaleString("en-ZA")}
                hint={
                  visitorsChange
                    ? `${visitorsChange} vs prior ${traffic.rangeDays}d`
                    : `Last ${traffic.rangeDays} days`
                }
              />
              <StatCard
                label="Pageviews"
                value={traffic.totals.pageviews.toLocaleString("en-ZA")}
                hint={
                  viewsChange
                    ? `${viewsChange} vs prior ${traffic.rangeDays}d`
                    : `Last ${traffic.rangeDays} days`
                }
              />
              <StatCard
                label="Views / visitor"
                value={
                  traffic.totals.visitors > 0
                    ? (traffic.totals.pageviews / traffic.totals.visitors).toFixed(2)
                    : "—"
                }
                hint="Rough engagement signal"
              />
            </div>

            <div className={styles.panel}>
              <h4 className={styles.panelTitle}>Daily pageviews</h4>
              {traffic.byDay.length === 0 ? (
                <p className={styles.muted}>No traffic in this range yet.</p>
              ) : (
                <div className={styles.bars}>
                  {traffic.byDay.map((day) => (
                    <div key={day.timestamp} className={styles.barCol} title={`${day.pageviews} views`}>
                      <div
                        className={styles.bar}
                        style={{
                          height: `${Math.max(4, (day.pageviews / maxDayViews) * 100)}%`,
                        }}
                      />
                      <span className={styles.barLabel}>{formatDay(day.timestamp)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.split}>
              <DimensionList
                title="Top referrers"
                rows={traffic.topReferrers}
                empty="No referrer data yet (direct visits won't show here)."
              />
              <DimensionList
                title="Countries"
                rows={traffic.topCountries}
                empty="No country data yet."
              />
              <DimensionList
                title="Devices"
                rows={traffic.devices}
                empty="No device data yet."
              />
            </div>
          </>
        ) : null}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Saved history (Sanity)</h3>
        <p className={styles.muted}>
          Free long-term archive. A nightly job copies each day&apos;s Vercel
          totals into Sanity. Anything already older than ~31 days on Hobby is
          gone from Vercel and cannot be recovered — this keeps everything from
          the first successful snapshot onward.
        </p>
        {archive.length === 0 ? (
          <div className={styles.setupCard}>
            <p className={styles.rowTitle}>No archived days yet</p>
            <p className={styles.muted}>
              After deploy, the nightly snapshot (or a one-time backfill) will
              pull the last ~31 days from Vercel into Sanity. Then those days
              remain visible here forever for Sanity members.
            </p>
          </div>
        ) : (
          <div className={styles.panel}>
            <ul className={styles.list}>
              {archive.map((row) => (
                <li key={row.date} className={styles.listRow}>
                  <span className={styles.rowTitle}>{row.date}</span>
                  <span className={styles.badge}>
                    {row.visitors} vis · {row.pageviews} views
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Enquiry pipeline</h3>

        {loading ? <p className={styles.muted}>Loading enquiry stats…</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        {stats ? (
          <>
            <div className={styles.statGrid}>
              <StatCard label="New" value={stats.newCount} hint="Needs follow-up" />
              <StatCard
                label="Last 7 days"
                value={stats.last7Days}
                hint="All statuses"
              />
              <StatCard
                label="Last 30 days"
                value={stats.last30Days}
                hint="All statuses"
              />
              <StatCard label="Total enquiries" value={stats.total} />
              <StatCard label="Contacted" value={stats.contacted} />
              <StatCard label="Completed" value={stats.completed} />
              <StatCard label="Spam" value={stats.spam} />
            </div>

            <div className={styles.split}>
              <div className={styles.panel}>
                <h4 className={styles.panelTitle}>Top requested services</h4>
                {stats.byService.length === 0 ? (
                  <p className={styles.muted}>No service-tagged enquiries yet.</p>
                ) : (
                  <ul className={styles.list}>
                    {stats.byService.map((row) => (
                      <li key={row.service} className={styles.listRow}>
                        <span>{row.service}</span>
                        <span className={styles.badge}>{row.count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.panel}>
                <h4 className={styles.panelTitle}>Recent enquiries</h4>
                {stats.recent.length === 0 ? (
                  <p className={styles.muted}>No enquiries yet.</p>
                ) : (
                  <ul className={styles.list}>
                    {stats.recent.map((row) => (
                      <li key={row.id} className={styles.listRow}>
                        <div>
                          <p className={styles.rowTitle}>{row.name || "Unnamed"}</p>
                          <p className={styles.muted}>
                            {row.service || "General"} · {formatDate(row.submittedAt)}
                          </p>
                        </div>
                        <span
                          className={`${styles.badge} ${styles[`status_${row.status || "new"}`]}`}
                        >
                          {row.status || "new"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
