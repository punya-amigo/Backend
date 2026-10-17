import express from "express";
import authRoutes from "../routes/auth.routes.js"
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);


app.get("/api",(req,res)=>{
    res.status(200).json({
        message:"you are welcome to my world"
    })
})

export default app;