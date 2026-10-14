import express from "express"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
const app = express();

app.use(express.json());
app.get("/api",(req,res)=>{
    res.status(200).json({message:"hello from server"})
})

app.post("/api/auth/register",async(req,res)=>{
    const {name , email , password} = req.body;
    
    const newUser = await userModel.create({
        name,email,password:await bcrypt.hash(password,10)
    })
    const token = jwt.sign({
         id: newUser._id
    },process.env.JWT_SECRET)
res.status(201).json({
    data:
         {user:
               {name,
                email,
                id:newUser._id}
                               ,token}})
})

app.get("/api/auth/me",async(req,res)=>{
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    const data = jwt.decode(authHeader);

    console.log("data  -" , data);

    const user = await userModel.findById(data.id)
    
    console.log("user-", user)
    res.status(200).json({message:"here it is " , user})
})

app.post("/api/auth/login",async(req,res)=>{
    const {email , password} = req.body;
    
    const user = await userModel.findOne({email})

    const isValidPassword =await  bcrypt.compare(password , user.password);

    if(!isValidPassword){
        return res.status(400).json({
            message:"invalid password or username"
        })
    }
   
    const token =  jwt.sign ({
        id:user.id,

    }, process.env.JWT_SECRET)
    res.status(201).json({
        message:"user loggedIn successfully",
        data:{
            user:{
                email:user.email,
                name:user.name
            }
        },
        token
    })

})

export default app;
