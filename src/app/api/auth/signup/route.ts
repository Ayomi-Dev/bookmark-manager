import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/jwt";

export const runtime = "nodejs"
export const POST = async (req: NextRequest ) => {
    console.log("route hit sign up")
    try {
        const body = await req.json();//recieves incoming form data from the client
        const { email, password, name} = body

        if(!email || !name || !password) {
            return NextResponse.json(
                {error: "Email, password and name required!"},
                { status : 400 }
            )
        } 
        const existingUser = await prisma.user.findUnique({ //checks if user with same email already exists
            where: { email }
        })
        if( existingUser ){
            return NextResponse.json(
                { message: "User with this email already exist"},
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10) //encrypts password

        const user = await prisma.user.create({ //creates a new user on successful signup
            data: {
              name,
              email,
              password: hashedPassword,
            },
            include: { bookmarks: true }
        });
        
        console.log(user)

        if(!process.env.JWT_SECRET){
            return NextResponse.json(
                { error: "No Secret Key Found!"},
                { status: 400}
            )
        }

        const payload = { id: user.id, email: user.email }
        const token = signToken( payload )

       const response = NextResponse.json(
            { 
                message: `Welcome ${user.name}`, 
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }, 
            { status: 201 }
        );

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
        return NextResponse.json(
            { message: "Something went wrong with the server"},
            { status : 500}
        )
    }
}