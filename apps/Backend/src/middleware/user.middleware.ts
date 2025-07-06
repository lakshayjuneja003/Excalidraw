import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";
export const userMiddleware = async (req: Request , res : Response , next : NextFunction) =>{
    try {
        const token = req.header("Authorization") || "";
        const decodedToken = jwt.verify(token , JWT_SECRET) as jwt.JwtPayload ;
        if(!decodedToken){
            res.status(400).json({
                message:"Invalid Token"
            })
            return;
        }
        console.log("Decoded Token " , decodedToken.id)
        req.userId = Number(decodedToken?.id)
        
        next()
    } catch (error) {
        console.log("Error in user middlware ", error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}