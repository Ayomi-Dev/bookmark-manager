import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const PATCH = async(req: NextRequest, context: { params: Promise<{ id: string }>}) => {
    try {
        const {id} = await context.params;
        const bookmarkID = Number(id);

        const bookmark = await prisma.bookmark.findUnique(
            {
                where: { id: bookmarkID }
            }
        )
        if(!bookmark){
            return NextResponse.json(
                { error: "Bookmark not found" },
                { status: 404}
            )
        }

        const archivedBookmark = await prisma.bookmark.update(
            {
                where: {id: bookmarkID},
                data: { isArchived: !bookmark.isArchived} //toggles the archive status
            }
        )
        return NextResponse.json(
            { bookmark: archivedBookmark },
            { status: 200}
        )
    } 
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to archive bookmark"},
            { status: 500 }
        )
    }
}