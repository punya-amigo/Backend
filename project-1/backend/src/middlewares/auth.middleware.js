import { readAccessToken } from "../utils/auth.util.js"

export function authenticate(req,res,next){
    const accesstoken = req.headers.authorization?.split(" ")[1]

    if(!accesstoken){
        return res.status(400).json({
            message:"access token not found in the headers"
        })
    }

    try{
        const decoded = readAccessToken(accesstoken)

        req.user=decoded

        next()
    }
    catch(err){
         res.status(401).json({
            message:"invalid or expired accesstoken"
         })
    }
}