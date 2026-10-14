import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = async (req,res,next)=>{
    const token = req.headers.authorization;

    const data = jwt.verify(token,process.env.JWT_SECRET);

    const user = await userModel.findById(user.id);
    
    req.user = user

    next();
}