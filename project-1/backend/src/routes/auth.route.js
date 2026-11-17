import {Router} from "express";
import {registerValidator , loginValidator} from "../validator/auth.validator.js";
import { register , login , refresh ,getme} from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",registerValidator,register)

router.post("/login",loginValidator,login)

router.post("/refreshToken",refresh)

router.get("/me",authenticate,getme)

export default router ; 