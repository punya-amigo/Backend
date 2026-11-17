import express from "express";
import authRoutes from "../routes/auth.route.js"
import cookieparser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authRoutes)

export default app; 
