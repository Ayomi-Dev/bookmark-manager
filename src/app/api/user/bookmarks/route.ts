import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const POST = async(req: NextRequest) => {
    try {
        const userID = req.headers.get("userID"); //gets the id of the user making the request
        const body = await req.json();
        const { url,tags, title, description, icon} = body;
        if(!userID){
            return NextResponse.json(
                { error: "Unauthorized request: No user found"},
                { status: 401 }
            )
        }

        if(!url){
            return NextResponse.json(
                { error: "Valid url required!"},
                { status: 400 }
            )
        }

        const newBookmark = await prisma.bookmark.create(
            {
                data: {
                    url,
                    tags,
                    description,
                    title,
                    icon,
                    userId: userID
                }
            }
        )
        
        console.log(newBookmark)

        return NextResponse.json(
            { message: "Bookmark created successfully!", newBookmark },
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