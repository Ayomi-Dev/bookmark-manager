import { NextResponse, NextRequest } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "@/lib/prisma";

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

catch (error: unknown) {
  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return NextResponse.json(
      { error: "You already saved this bookmark" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}

}

export const GET = async(req: NextRequest) => {
    try {
        const userId = req.headers.get("userID");
    
        if(!userId){
            return NextResponse.json(
                { error: "Unaduthorized request: No user found"},
                { status: 401 }
            )
        }
    
        const user = await prisma.user.findUnique(
            {
                where: { id: userId },
                include: { bookmarks: true}
            }
        )
        if(!user){
            return NextResponse.json(
                { error: "No User Found!"},
                { status: 404 }
            )
        }
    
        return NextResponse.json(
            { 
               bookmarks: user.bookmarks
            },
            { status: 200}
        )
        
    } 
    catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: `${error}: Unable to get bookmarks` }
        )
    }
}