import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    console.log("logout hit")
    // Overwrites the token cookie with empty value + immediate expiry
    const response = NextResponse.json({ success: true, message: "Logged out" });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // expired
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
};
