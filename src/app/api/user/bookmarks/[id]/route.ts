import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


const prisma = new PrismaClient()


export const DELETE = async (req: NextRequest, { params}: { params: { id: string}}) => {
    try {
        const bookmarkId= await params
        const id  = Number(bookmarkId.id)
        const userId = req.headers.get("userId")
        console.log(id)
       if(!userId){
            return NextResponse.json(
                { error: "Unauthorized request: No user found" },
                { status: 401}
            )
       }

       const bookmark = await prisma.bookmark.findUnique( //queries the db and fetches the bookmark that matches the id
            {
                where: { id }
            }
       )
       if(!bookmark){
            return NextResponse.json(
                { error: "No bookmark found"},
                { status: 404 }
            )
       }

       if(bookmark.userId !== userId){ //checks if user connected to bookmark matches the userID extracted from the request
            return NextResponse.json(
                { error: "Not authorized to delete this bookmark"},
                { status: 403}
            )
       }

       await prisma.bookmark.delete(
        {
            where: { id }
        })
       
       return NextResponse.json(
            { message: "Bookmark deleted succesfully!"},
            { status: 201 }
       )
    } 
    catch (error) {
       console.log(error)
       return NextResponse.json(
        {error: "Internal server error"},
        { status: 500 }
       ) 
    }
}