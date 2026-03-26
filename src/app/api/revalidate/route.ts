import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * This endpoint purges Prismic content from Next.js' cache. It is called when
 * content is published in Prismic.
 */
export async function POST(request: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get("prismic-webhook-secret");
    if (header !== secret) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
