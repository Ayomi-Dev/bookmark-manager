import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";



export const POST = async(req: NextRequest) => {
    try {
        const body = await req.json()
        const { email, password } = body;

        if(!email || !password) {
            return NextResponse.json(
                { error: "Email and password required!"},
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
            include: { bookmarks: true}
        })
        
        if(!existingUser) {
            return NextResponse.json(
                { message: "User does not exist!"},
                { status: 400 }
            )
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if(!validPassword){
            return NextResponse.json(
                { message: "Password incorrect!"},
                { status: 400 }
            )
        }

        if(!process.env.JWT_SECRET){
            return NextResponse.json(
                { error: "No secret jwt defined"},
                { status: 401 }
            )
        }

        const payload = { id: existingUser.id, isAdmin: existingUser.isAdmin } 
        const token = signToken( payload );

        const response = NextResponse.json( 
            { 
                success: true,
                user:{
                    id: existingUser.id,
                    email: existingUser.email,
                },
                
            }
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/',
            maxAge: 60 * 60
        });
        return response;
    } 
    catch (error) {
        console.log(error);
        NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}