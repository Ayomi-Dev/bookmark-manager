import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import urlMetadata from "url-metadata";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    console.log("route hit")
  try {
    const { bookmarkId, url } = await req.json();

    if (!bookmarkId || !url) {
      return NextResponse.json({ error: "Missing bookmarkId or url" }, { status: 400 });
    }

    // 🧠 Fetch metadata
    const metadata = await urlMetadata(url).catch(() => null); //fetches metadata of the url received

    if (!metadata) {
      return NextResponse.json({ message: "Metadata fetch failed" }, { status: 200 });
    }

    
    await prisma.bookmark.update({
      where: { id: bookmarkId },
      data: {
        title: metadata.title || "",
        description: metadata.description || "",
        icon: metadata["og:image"] || metadata.icon || "/default-favicon.png",
      },
    });

    return NextResponse.json({ message: "Metadata updated" }, { status: 200 });
  } 
  catch (error) {
    console.error("Metadata fetch error:", error);
    return NextResponse.json({ error: "Error fetching metadata" }, { status: 500 });
  }
};
