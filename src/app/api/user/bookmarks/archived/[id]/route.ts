import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const PATCH = async(req: NextRequest, { params }: { params: { id: string }}) => {
    try {
        const bookmarkId = await params;
        const id = Number(bookmarkId.id);

        const bookmark = await prisma.bookmark.findUnique(
            {
                where: { id }
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
                where: {id},
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