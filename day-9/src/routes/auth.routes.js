import {Router} from "express";
import bcrypt from "bcryptjs";
import customerModel from "../models/customer.model.js";
import { generateTokens , verifyAccessToken, verifyRefreshToken} from "../utils/auth.js";
const router = Router();


router.post("/register",async(req,res)=>{
    const {email , name , password} = req.body;
    
    const userExists = await customerModel.findOne({email});

    if(userExists){
        res.status(400).json({
            message:"user already exists",
            errors:[
                {
                // field or path: "email"
                field:"email",
                message:"user already exists"
            }
        ]
        })
     };
  
     const customer = await customerModel.create({
        name,
        email,
        passwordHash:await bcrypt.hash(password,12)
     })
    
      const {accessToken,refreshToken} = generateTokens({customerId:customer._id});

      customer.refreshToken=refreshToken;
      await customer.save();

      res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
      })

      

     res.status(201).json({
        message:"user created successfully",
        data:{
            user:{
                name:customer.name,
                email:customer.email,
        },
        },accessToken
})
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const customer = await customerModel.findOne({email});
    if(!customer){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const isMatch = await bcrypt.compare(password,customer.passwordHash);
    if(!isMatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const {accessToken,refreshToken} = generateTokens({userId:customer._id});
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
    })
    res.status(200).json({
        message:"login successful",
        data:{name:customer.name,
        email:customer.email,},accessToken
})
})

router.get("/me",async(req,res)=>{
    const acessToken = req.headers.authorization?.split(" ")[1];
    
    try {
        const decoded = verifyAccessToken(acessToken);

        const customer = await customerModel.findById(decoded.id)

        res.status(200).json({
            message:"user fetched successfully",
            data:{
                user:{
                    name:customer.name,
                    email:customer.email
                }
            }
        })
    } catch (error) {
        res.status(401).json({
            message:"unauthorized , invalid or expired accesstoken"
        })
    }

})

router.post("/refresh",async (req,res)=>{
       const refreshToken = req.cookies.refreshToken;

    

       if(!refreshToken){
        res.status(401).json({
            message:"unathuroized, refresh token could not be found"
        })
       };
     
       try {
            const decoded = verifyRefreshToken(refreshToken);
            
             const customer = await customerModel.findById(decoded.id)
           
             if(refreshToken !== customer.refreshToken){
                customer.refreshToken=null;
                await customer.save()

                return res.status(401).json({
                    message:"unauthorized , refresh token mismatch"
                })
             }


            const {accessToken , refreshToken:newRefreshToken  } = generateTokens({customerId:customer.id})
           
            res.cookie("refreshToken",newRefreshToken,{httpOnly:true})

            customer.refreshToken=newRefreshToken;
            await customer.save()

            res.status(200).json({
                message:"tokens refreshed successfully",
                accessToken
            })

       } catch (error) {
       return  res.status(401).json({
            message:"invalid refresh token"
        })
       }

})
export default router;