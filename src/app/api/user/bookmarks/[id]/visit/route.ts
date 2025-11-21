import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export const PATCH = async(req: NextRequest, { params }: {params: {id: string}} ) => {
    const bookmarkId = await params
    const id = Number(bookmarkId.id)
    const userId = req.headers.get("userId")

    if(!userId){
        return NextResponse.json(
            { error: "Unauthorized request. No User logged in"},
            { status: 401 }
        )
    }

    const bookmark = await prisma.bookmark.update( //updates the selected bookmark 
        {
            where: { id },
            data: {
                timesVisited: { increment: 1}, //increases this property by 1 everytimes the API is callled
                lastVisited: new Date()
            }
        }
    )
    
    if(!bookmark){
        return NextResponse.json(
            { error: "No bookmark found"},
            { status: 404 }
        )
    }

    return NextResponse.json(
        { bookmark },
        { status: 200 }
    )

}