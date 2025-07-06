import { prisma } from "@repo/database/dbClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config"
const SignupHandler = async ( req: Request, res: Response ) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            res.status(400).json({
                message: "All fields are required"
            })
            return ;
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existingUser){
            res.status(400).json({
                message: "User already exists"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password , 10);

        const createdUser = await prisma.user.create({
            data: {
                name,
                email , 
                password : hashedPassword
            }
        })

        if(!createdUser){
            res.status(400).json({
                message:"User not created . Internal Server Error"
            })
        }
        res.status(201).json({
            message:"User Created Succesfully",
            user : createdUser
        })

        return;
    } catch (error) {
        console.log("error in SignInHandler " ,  error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return ;
    }
}

const SignInHandler = async ( req : Request , res : Response) =>{
    try {
        const { email , password} = req.body;

        if(!email || !password ){
            res.status(400).json({
                message:"All Fields Are Required"
            })
            return;
        }

        const CheckUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!CheckUser){
            res.status(400).json({
                message:"user not found"
            })
            return;
        }
        const CheckPassword = await bcrypt.compare(password , CheckUser.password)
        if(!CheckPassword){
            res.status(400).json({
                message:"Invalid Credentialds"
            })
            return;
        }
        const token = jwt.sign({
            id: CheckUser.id,
            email:CheckUser.email
        }, JWT_SECRET)


        res.status(201).json({
            message:"User logged in Succesfully",
            token:token,
            user:CheckUser
        })
        return;
    } catch (error) {
        console.log("error in SignInHandler " , error)
    }
}

const UserProfile = async (req : Request , res : Response)=>{
    try { 
        const { userId } = req;
        console.log("UserID : " ,userId)
        const checkUser = await prisma.user.findUnique({
            where:{
                // @ts-ignore
                id:userId
            }
        })
        if(!checkUser){
            res.status(400).json({
                message:"User not found"
            })
        }
        res.status(201).json({
            message:"User found",
            user:checkUser
        })
        return;
    } catch (error) {
        console.log("error in profile handler (User) " , error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}   

export { SignupHandler , SignInHandler , UserProfile}