import express from "express";
import authRoutes from "../routes/auth.route.js"
import cookieparser from "cookie-parser"
import productRoutes from "../routes/product.routes.js"

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth",authRoutes)
app.use("/api/product",productRoutes)

export default app; 
