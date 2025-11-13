import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const POST = async(req: NextRequest) => {
    try {
        const userID = req.headers.get("userID"); //gets the id of the user making the request
        const body = await req.json();
        const { url ,tags} = body;
        if(!userID || !url){
            return NextResponse.json(
                { error: "Unauthorized request"},
                { status: 401 }
            )
        }

        console.log

        const newBookmark = await prisma.bookmark.create(
            {
                data: {
                    url,
                    tags,
                    userId: userID
                }
            }
        )
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/bookmarks/metadata`, { //fetches metadata of the url recieved in the background
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookmarkId: newBookmark.id, url }),
        }).catch((err) => console.error("Background fetch failed:", err));
        console.log(newBookmark)

        return NextResponse.json(
            { message: "Bookmark created", bookmark: newBookmark },
            { status: 201 }
        )
    } 
    catch (error: any) {// Handles unique constraint violation
        if (error.code === "P2002") {
          return NextResponse.json(
            { error: "You already saved this bookmark" },
            { status: 400 }
          );
        }

        console.error("Error creating bookmark:", error);
        return NextResponse.json(
            { error: "Failed to create bookmark" },
            { status: 500 }
        );
    }
}