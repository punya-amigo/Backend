import config from "../config/config.js";
import jwt from "jsonwebtoken";


export function createAccessToken({userId,role}){
       const AccessToken = jwt.sign({
        userId,role
       },config.ACCESS_TOKEN_SECRET,{expiresIn:"15min"})
       return AccessToken
}

export function createRefreshToken({userId,role}){
       const RefreshToken = jwt.sign({
        userId,role
       },config.REFRESH_TOKEN_SECRET,{expiresIn:"7days"})
       return RefreshToken
    }

export function readRefreshToken(refreshToken){
       return jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
}

export function readAccessToken(accesstoken){
       return jwt.verify(accesstoken,config.ACCESS_TOKEN_SECRET)
}