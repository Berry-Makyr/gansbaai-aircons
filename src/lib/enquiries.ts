import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export type EnquiryStatus = "new" | "contacted" | "completed" | "spam";

export type EnquiryRow = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  internalNotes: string;
};

export type EnquiryStats = {
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

const STATUSES: EnquiryStatus[] = ["new", "contacted", "completed", "spam"];

export function isEnquiriesDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add the Neon connection string to this environment."
    );
  }
  return neon(url);
}

export async function ensureEnquiriesTable(): Promise<void> {
  const sql = getSql();
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
  await sql`CREATE INDEX IF NOT EXISTS enquiries_submitted_at_idx ON enquiries (submitted_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status)`;
}

function mapRow(row: Record<string, unknown>): EnquiryRow {
  const status = STATUSES.includes(row.status as EnquiryStatus)
    ? (row.status as EnquiryStatus)
    : "new";
  const submitted =
    row.submitted_at instanceof Date
      ? row.submitted_at.toISOString()
      : String(row.submitted_at || "");
  return {
    id: String(row.id),
    submittedAt: submitted,
    name: String(row.name || ""),
    email: String(row.email || ""),
    phone: String(row.phone || ""),
    service: String(row.service || ""),
    message: String(row.message || ""),
    status,
    internalNotes: String(row.internal_notes || ""),
  };
}

export async function insertEnquiry(input: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  submittedAt?: string;
  status?: EnquiryStatus;
  internalNotes?: string;
  sanityId?: string;
}): Promise<EnquiryRow> {
  await ensureEnquiriesTable();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO enquiries (
      submitted_at, name, email, phone, service, message, status, internal_notes, sanity_id
    ) VALUES (
      ${input.submittedAt || new Date().toISOString()},
      ${input.name},
      ${input.email},
      ${input.phone || ""},
      ${input.service},
      ${input.message},
      ${input.status || "new"},
      ${input.internalNotes || ""},
      ${input.sanityId || null}
    )
    ON CONFLICT (sanity_id) DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      service = EXCLUDED.service,
      message = EXCLUDED.message
    RETURNING *
  `;
  return mapRow(rows[0] as Record<string, unknown>);
}

export async function listEnquiries(limit = 100): Promise<EnquiryRow[]> {
  await ensureEnquiriesTable();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM enquiries
    ORDER BY submitted_at DESC
    LIMIT ${limit}
  `;
  return (rows as Record<string, unknown>[]).map(mapRow);
}

export async function updateEnquiry(
  id: string,
  patch: { status?: EnquiryStatus; internalNotes?: string }
): Promise<EnquiryRow | null> {
  await ensureEnquiriesTable();
  const sql = getSql();
  if (patch.status && !STATUSES.includes(patch.status)) {
    throw new Error("Invalid status");
  }
  const rows = await sql`
    UPDATE enquiries
    SET
      status = COALESCE(${patch.status ?? null}, status),
      internal_notes = COALESCE(${patch.internalNotes ?? null}, internal_notes)
    WHERE id = ${id}
    RETURNING *
  `;
  if (!rows[0]) return null;
  return mapRow(rows[0] as Record<string, unknown>);
}

export async function getEnquiryStats(): Promise<EnquiryStats> {
  await ensureEnquiriesTable();
  const sql = getSql();
  const [counts] = (await sql`
    SELECT
      count(*)::int AS total,
      count(*) FILTER (WHERE status = 'new')::int AS new_count,
      count(*) FILTER (WHERE status = 'contacted')::int AS contacted,
      count(*) FILTER (WHERE status = 'completed')::int AS completed,
      count(*) FILTER (WHERE status = 'spam')::int AS spam,
      count(*) FILTER (WHERE submitted_at >= now() - interval '7 days')::int AS last_7_days,
      count(*) FILTER (WHERE submitted_at >= now() - interval '30 days')::int AS last_30_days
    FROM enquiries
  `) as Record<string, number>[];

  const recentRows = await sql`
    SELECT * FROM enquiries
    ORDER BY submitted_at DESC
    LIMIT 12
  `;

  const serviceRows = await sql`
    SELECT service, count(*)::int AS count
    FROM enquiries
    WHERE status <> 'spam' AND service IS NOT NULL AND service <> ''
    GROUP BY service
    ORDER BY count DESC
    LIMIT 8
  `;

  return {
    total: Number(counts?.total || 0),
    newCount: Number(counts?.new_count || 0),
    contacted: Number(counts?.contacted || 0),
    completed: Number(counts?.completed || 0),
    spam: Number(counts?.spam || 0),
    last7Days: Number(counts?.last_7_days || 0),
    last30Days: Number(counts?.last_30_days || 0),
    recent: (recentRows as Record<string, unknown>[]).map(mapRow),
    byService: (serviceRows as { service: string; count: number }[]).map(
      (row) => ({
        service: row.service || "General",
        count: Number(row.count || 0),
      })
    ),
  };
}
