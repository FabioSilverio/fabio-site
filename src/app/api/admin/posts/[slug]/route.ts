import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidAdminSession } from "@/lib/admin-auth";
import { removePost } from "@/lib/cms";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function DELETE(request: Request, context: RouteContext) {
  const session = request.headers
    .get("cookie")
    ?.split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("fabio-admin-session="))
    ?.split("=")[1];

  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const result = await removePost(slug);

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json(result);
}
