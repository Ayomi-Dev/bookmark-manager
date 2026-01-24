import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export const GET = async (  req: NextRequest) => {

    try {
        const userId = req.headers.get("userID");
        
        if (!userId) {
          return NextResponse.json(
            { error: "Unauthorized request" },
            { status: 401 }
          );
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { bookmarks: true }
        })
        if(!user){
            return NextResponse.json(
                { error: "User not found!"},
                { status: 404}
            )
        }
        const foundUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            bookmarks: user.bookmarks,
            image: user.image
        }

        return NextResponse.json( 
            { user: foundUser, success: true },
            { status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json( { error: "Cannot fetch user at this time"})
    }
}