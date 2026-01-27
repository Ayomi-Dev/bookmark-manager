import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET as string;


// export const signToken = (payload: object) => {
//     return jwt.sign(payload, SECRET, { expiresIn: "1hr"});
// }

// export const verifyToken = ( token: string) => {
//     return jwt.verify( token, SECRET )
// }



export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1hr" });
};

// Verify token using jose (but Edge-friendly)
export const verifyToken = async (token: string) => {
  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};