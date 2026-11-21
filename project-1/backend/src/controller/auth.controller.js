import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken , createRefreshToken , readRefreshToken} from "../utils/auth.util.js";

export async function register (req,res) {

    const {email,name,password}=req.body;

    const isEmailAlreadyExists = await userModel.findOne({
        email
    })

    if(isEmailAlreadyExists){
          return res.status(400).json({
            message:"user already exists with this email address",
            errors:[
                {
                    path:"email",
                    msg:"email address already exists"
                }
            ]
          })
    }
    
    const user =await userModel.create({
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

    res.cookie("refreshtoken",refreshtoken,{
        httpOnly:true
    })
    

    await userModel.findByIdAndUpdate(user._id,{
        refreshtoken
    })

    res.status(201).json({
        message:"user registered successfully",
        data:{
            user:{
                id:user._id,
                email:user.email,
                name:user.name
                },
                accesstoken
        }
    })
}

export async function login (req,res){
    const {email , password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"email or password is incorrect",
            
        })
    }

    const isPasswordValid = bcrypt.compare(password,user.passwordHash)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const accesstoken = createAccessToken({
        userId:user._id,
        role:user.role
    })

    const Newrefreshtoken = createRefreshToken({
        userId:user._id,
        role:user.role
    })


    await userModel.findOneAndUpdate({
        email
    },{
        refreshtoken:Newrefreshtoken
    })
    

    res.cookie("refreshtoken",Newrefreshtoken,{
        httpOnly:true
    })

    res.status(200).json({
        message:"user logged in successfully ",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            },
            accesstoken
        }
    })
}

export async function refresh (req,res){
    const refreshtoken=req.cookies.refreshtoken;

    if(!refreshtoken){
        return res.status(401).json({
            message:"refresh token is required"
        })
    }

    try{
        const decoded = readRefreshToken(refreshtoken);

        const {userId,role}=decoded;

        const user = await userModel.findById(userId);

        if(refreshtoken != user.refreshtoken){
            await userModel.findByIdAndUpdate(userId,{
                refreshtoken:null
            })
            return res.status(401).json({
                message:"invalid refresh token"
            })
        }
      const accesstoken = createAccessToken({
        userId:user._id,
        role:user.role
      })

      const Newrefreshtoken = createRefreshToken ({
        userId:user._id,
        role:user.role
      })

      await userModel.findByIdAndUpdate(user._id,{
        refreshtoken:Newrefreshtoken
      })

      res.cookie("refreshtoken",Newrefreshtoken,{
        httpOnly:true
      })

      res.status(200).json({
        message:"tokens refreshed successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        },accesstoken
      })
}
catch(error){
    return res.status(401).json({
        message:"invalid refresh token"
    })
}}


export async function getme(req,res){
    const {userId,role}=req.user

    const user =await userModel.findById(userId)

    res.status(200).json({
        message:"user data fetched successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        }
    })
}                         