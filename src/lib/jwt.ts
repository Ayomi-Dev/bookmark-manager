import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;


export const signToken = (payload: object) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1hr"});
}

export const verifyToken = ( token: string ) => {
    try {
        return jwt.verify( token, SECRET )
    } 
    catch (error) {
        return null
    }
        
}