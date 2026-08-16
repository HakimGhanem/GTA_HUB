import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { assertContentSecret } from "@/lib/content/auth";

/**
 * POST { tags?: string[], paths?: string[] }
 * Authorization: Bearer CONTENT_API_SECRET
 */
export async function POST(request: Request) {
  const denied = assertContentSecret(request);
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as {
    tags?: string[];
    paths?: string[];
  };

  const tags = body.tags?.length ? body.tags : ["news"];
  const paths = body.paths ?? ["/sitemap.xml", "/news.xml"];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, tags, paths });
}
