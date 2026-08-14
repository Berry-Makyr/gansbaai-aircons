"use client";

import { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import type { EnquiryRow, EnquiryStatus } from "@/lib/enquiries";
import styles from "../analytics/analyticsTool.module.css";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "completed", "spam"];

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function EnquiriesTool() {
  const client = useClient({ apiVersion: "2026-07-11" });
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = client.config().token;
      const response = await fetch("/api/crm/enquiries", {
        credentials: "same-origin",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = (await response.json()) as {
        enquiries?: EnquiryRow[];
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Failed to load enquiries");
      }
      setRows(data.enquiries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  const selected = rows.find((row) => row.id === selectedId) || null;

  async function save(id: string, patch: Partial<Pick<EnquiryRow, "status" | "internalNotes">>) {
    setSavingId(id);
    try {
      const token = client.config().token;
      const response = await fetch("/api/crm/enquiries", {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id,
          status: patch.status,
          internalNotes: patch.internalNotes,
        }),
      });
      const data = (await response.json()) as {
        enquiry?: EnquiryRow;
        error?: string;
      };
      if (!response.ok || !data.enquiry) {
        throw new Error(data.error || "Failed to update enquiry");
      }
      setRows((current) =>
        current.map((row) => (row.id === id ? data.enquiry! : row))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update enquiry");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>Website Enquiries</h2>
        <p className={styles.lede}>
          Private CRM stored in Neon (not Sanity). Same Studio login. Status and
          notes stay off the public CMS after the Sanity trial ends.
        </p>
      </header>

      {loading ? <p className={styles.muted}>Loading enquiries…</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      {!loading && rows.length === 0 ? (
        <div className={styles.setupCard}>
          <p className={styles.rowTitle}>No enquiries yet</p>
          <p className={styles.muted}>
            New contact-form submissions appear here. Existing Sanity enquiries
            are migrated with the one-off script.
          </p>
        </div>
      ) : null}

      <div className={styles.split}>
        <div className={styles.panel}>
          <h4 className={styles.panelTitle}>Inbox</h4>
          <ul className={styles.list}>
            {rows.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  className={`${styles.rangeButton} ${selectedId === row.id ? styles.rangeButtonActive : ""}`}
                  onClick={() => setSelectedId(row.id)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <strong>{row.name || "Unnamed"}</strong>
                  <span className={styles.muted}>
                    {" "}
                    · {row.service || "General"} · {formatDate(row.submittedAt)}
                  </span>
                  <span className={`${styles.badge} ${styles[`status_${row.status}`]}`}>
                    {row.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel}>
          <h4 className={styles.panelTitle}>Details</h4>
          {!selected ? (
            <p className={styles.muted}>Select an enquiry.</p>
          ) : (
            <div className={styles.list}>
              <p className={styles.rowTitle}>{selected.name}</p>
              <p className={styles.muted}>{formatDate(selected.submittedAt)}</p>
              <p>
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
                {selected.phone ? (
                  <>
                    {" · "}
                    <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                  </>
                ) : null}
              </p>
              <p>
                <strong>Service:</strong> {selected.service}
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>{selected.message}</p>

              <label className={styles.muted} htmlFor="enquiry-status">
                Status
              </label>
              <select
                id="enquiry-status"
                className={styles.field}
                value={selected.status}
                disabled={savingId === selected.id}
                onChange={(event) =>
                  void save(selected.id, {
                    status: event.target.value as EnquiryStatus,
                  })
                }
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <label className={styles.muted} htmlFor="enquiry-notes">
                Internal notes
              </label>
              <textarea
                id="enquiry-notes"
                className={styles.field}
                rows={5}
                defaultValue={selected.internalNotes}
                key={selected.id}
                onBlur={(event) => {
                  if (event.target.value !== selected.internalNotes) {
                    void save(selected.id, { internalNotes: event.target.value });
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
