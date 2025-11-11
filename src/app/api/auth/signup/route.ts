import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt"
import { signToken } from "@/lib/jwt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest ) => {
    try {
        const body = await req.json();
        const { email, password, name} = body

        if(!email || !name) {
            return NextResponse.json(
                {error: "Email and name required!"},
                { status : 400}
            )
        } 

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if( existingUser ){
           return NextResponse.json(
                { message: "User with this email already exist"}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10) //encrypts password

        const user = await prisma.user.create({
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

        return NextResponse.json(
            { 
                message: `Welcome ${user.name}`, 
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            },
            { status: 201 }
        )
    } 

    catch (error) {
        NextResponse.json(
            { message: "Something went wrong with the server"},
            { status : 500}
        )
    }
}