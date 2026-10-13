import express from "express"
import jwt from "jsonwebtoken"
const app = express();

app.use(express.json());
app.get("/api",(req,res)=>{
    res.status(200).json({message:"hello from server"})
})

app.post("/api/auth/register",(req,res)=>{
    const {name , email , password} = req.body;
    // save data to database
    const token = jwt.sign({
        name , email 
    },"7HwXppz5Ra9I1NQVG13p85rYyp1wcncNBg9NiAiL2sK"
)
res.status(201).json({data:{user:{name,email},token}})
})
export default app;
