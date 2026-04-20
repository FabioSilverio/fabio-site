import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isValidAdminSession } from "@/lib/admin-auth";
import { getContentStorageMode, saveSiteConfig } from "@/lib/cms";
import type { SiteConfig } from "@/lib/cms-shared";

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
    const body = (await request.json()) as SiteConfig;
    const result = await saveSiteConfig(body);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/talks");
    revalidatePath("/media");
    revalidatePath("/projects");
    revalidatePath("/admin");

    return NextResponse.json({
      siteConfig: result,
      storageMode: getContentStorageMode(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save site settings.",
      },
      { status: 400 },
    );
  }
}
