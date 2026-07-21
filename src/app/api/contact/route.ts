import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { z } from "zod";
import { apiVersion, dataset, projectId } from "@/sanity/env";

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
});

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
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    if (!writeToken) {
      console.error(
        "Contact Form Error: SANITY_API_WRITE_TOKEN is not configured"
      );
      return NextResponse.json(
        {
          error:
            "The enquiry service is temporarily unavailable. Please contact us directly.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = result.data;
    const sanity = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: writeToken,
    });

    await sanity.create({
      _type: "enquiry",
      status: "new",
      submittedAt: new Date().toISOString(),
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
      process.env.CONTACT_EMAIL || "admin@gbaircon.co.za";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Gansbaai Aircon Website <onboarding@resend.dev>";
    const apiKey = process.env.RESEND_API_KEY;
    let emailNotificationSent = false;

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
        } else {
          emailNotificationSent = true;
        }
      } catch (notificationError) {
        console.warn("Resend notification failed:", notificationError);
      }
    }

    return NextResponse.json(
      { success: true, emailNotificationSent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
