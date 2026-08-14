import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { insertEnquiry, isEnquiriesDbConfigured } from "@/lib/enquiries";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().min(1, "Please select a service").max(100),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  "bot-field": z.string().optional(),
});

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateBucket = { count: number; resetAt: number };

const globalRateStore = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateBucket>;
};

function getRateStore(): Map<string, RateBucket> {
  if (!globalRateStore.__contactRateLimit) {
    globalRateStore.__contactRateLimit = new Map();
  }
  return globalRateStore.__contactRateLimit;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { ok: boolean; retryAfterSec: number } {
  const store = getRateStore();
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || existing.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  store.set(ip, existing);
  return { ok: true, retryAfterSec: 0 };
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many enquiries. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    if (!isEnquiriesDbConfigured()) {
      console.error("Contact Form Error: DATABASE_URL is not configured");
      return NextResponse.json(
        {
          error:
            "The enquiry service is temporarily unavailable. Please contact us directly.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Honeypot: bots fill hidden fields; humans leave them empty.
    if (
      typeof body?.["bot-field"] === "string" &&
      body["bot-field"].trim().length > 0
    ) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = result.data;
    await insertEnquiry({
      name,
      email,
      phone: phone || "",
      service,
      message,
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const contactEmail =
      (process.env.CONTACT_EMAIL || "sales@gbaircon.co.za").trim();
    const fromEmail =
      (
        process.env.CONTACT_FROM_EMAIL ||
        "Gansbaai Aircon Website <noreply@gbaircon.co.za>"
      ).trim();
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: [contactEmail],
          replyTo: email,
          subject: `New website enquiry: ${service.replace(/[\r\n]/g, " ")} - ${name.replace(/[\r\n]/g, " ")}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Service Required:</strong> ${safeService}</p>
            <hr />
            <h3>Message:</h3>
            <p>${safeMessage}</p>
          `,
          text: [
            "New Contact Form Submission",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Service Required: ${service}`,
            "",
            message,
          ].join("\n"),
        });

        if (emailResponse.error) {
          console.warn("Resend notification failed:", emailResponse.error);
        }
      } catch (notificationError) {
        console.warn("Resend notification failed:", notificationError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
