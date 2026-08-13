import { NextResponse } from "next/server";
import {
  getEnquiryStats,
  isEnquiriesDbConfigured,
  listEnquiries,
  updateEnquiry,
  type EnquiryStatus,
} from "@/lib/enquiries";
import { getBearerToken, getSanityMemberFromToken } from "@/lib/sanity-member";

async function requireMember(request: Request) {
  const member = await getSanityMemberFromToken(getBearerToken(request));
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const denied = await requireMember(request);
  if (denied) return denied;

  if (!isEnquiriesDbConfigured()) {
    return NextResponse.json(
      {
        error:
          "Enquiry database is not configured. Set DATABASE_URL on this Vercel environment.",
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("stats") === "1") {
    const stats = await getEnquiryStats();
    return NextResponse.json(stats);
  }

  const rows = await listEnquiries(200);
  return NextResponse.json({ enquiries: rows });
}

export async function PATCH(request: Request) {
  const denied = await requireMember(request);
  if (denied) return denied;

  if (!isEnquiriesDbConfigured()) {
    return NextResponse.json(
      { error: "Enquiry database is not configured." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as {
    id?: string;
    status?: EnquiryStatus;
    internalNotes?: string;
  };

  if (!body.id) {
    return NextResponse.json({ error: "Missing enquiry id" }, { status: 400 });
  }

  const updated = await updateEnquiry(body.id, {
    status: body.status,
    internalNotes: body.internalNotes,
  });

  if (!updated) {
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ enquiry: updated });
}
