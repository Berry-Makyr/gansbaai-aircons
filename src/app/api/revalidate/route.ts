import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      console.error("Missing SANITY_REVALIDATE_SECRET");
      return NextResponse.json(
        { error: "Revalidation is not configured." },
        { status: 500 }
      );
    }

    // Wait briefly so CDN/API propagation completes before the next fetch.
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      secret,
      true
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    revalidateTag(body._type, "max");
    revalidateTag("homepage", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body._type,
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "Revalidation failed." },
      { status: 500 }
    );
  }
}
