import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken , createRefreshToken} from "../utils/auth.util.js";

export async function register (req,res) {

    const {email,name,password}=req.body;

    const isEmailAlreadyExists = userModel.findOne({
        email
    })

    if(isEmailAlreadyExists){
          return res.status(400).json({
            message:"user already exists with this email address",
            errors:[
                {
                    field:email,
                    message:"email address already exists"
                }
            ]
          })
    }
    
    const user = userModel.create({
        email,
        name,
        passwordHash:await bcrypt.hash(password,12)
    })

    const accesstoken = createAccessToken({
        userId:user._id,
        role:user.role
    }) 

    const refreshtoken = createRefreshToken({
         userId:user._id,
         role:user.role
    })
}