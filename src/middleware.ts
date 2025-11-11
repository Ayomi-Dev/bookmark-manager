import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";


interface UserPayload {
    id: string;
    isAdmin: boolean;
}

// Routes that require authentication
const protectedRoutes = ["/api/user/profile", "/api/auth/user/bookmarks", "/dashboard"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    // Only protect routes in the route list
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if(isProtected){
        const token = req.cookies.get("token")?.value;  // Extracts token from cookies
        console.log("middleware hit)", token)
        if (!token) {
            return NextResponse.json(
              { message: "Authentication required!" },
              { status: 401 }
            );
        }

        const decoded = await verifyToken(token);           // Verifies the extracted token
        console.log(decoded, "Decoded token in middleware");
        if (!decoded) {
          // const response = NextResponse.redirect(new URL('/login', req.url))
          // response.cookies.delete("token") //clears the token if the token isn't verified correctly or expired
          return NextResponse.json(
            { message: "Invalid or expired token!" },
            { status: 401 }
          );
        }

        const response = NextResponse.next();
        response.headers.set("userID", decoded.id as string)

        return response;
    }
    console.log("all passed")
    return NextResponse.next(); 
  } 


//  Tells Next.js which routes to apply the middleware to
export const config = {
  matcher: [
    "/api/user/:path*", // protect all API routes under /api
    "/dashboard/:path*", // protect dashboard pages
  ],
};
