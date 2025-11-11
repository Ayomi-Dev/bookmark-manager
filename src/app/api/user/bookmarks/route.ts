import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const POST = async(req: NextRequest) => {
    console.log("route hit")
    try {
        const userID = req.headers.get("userID"); //gets the id of the user making the request
        if(!userID){
            return NextResponse.json(
                { error: "Unauthorized request"},
                { status: 401 }
            )
        }

        const body = await req.json();
        const { url, title, description, tags, icon, } = body;
                console.log(tags, userID, title, description, icon, url)

        const newBookmark = await prisma.bookmark.create(
            {
                data: {
                    url,
                    title,
                    icon,
                    description,
                    tags,
                    userId: userID
                }
            }
        )
        
        return NextResponse.json(
            { message: "Bookmark created", newBookmark },
            { status: 201 }
        )
    } 
    catch (error: any) {// Handles unique constraint violation
        console.error("Error details:", error);
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