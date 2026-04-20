import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { upsertPost } from "@/lib/cms";
import { isValidAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const session = request.headers
    .get("cookie")
    ?.split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("fabio-admin-session="))
    ?.split("=")[1];

  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      content?: string;
      date?: string;
      previousSlug?: string;
      slug?: string;
      summary?: string;
      title?: string;
    };

    const result = await upsertPost({
      content: body.content ?? "",
      date: body.date ?? "",
      previousSlug: body.previousSlug,
      slug: body.slug,
      summary: body.summary ?? "",
      title: body.title ?? "",
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${result.post.slug}`);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save post.",
      },
      { status: 400 },
    );
  }
}
