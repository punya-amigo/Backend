import {Router} from "express";
import {createProductController} from "../controller/product.controller.js";
import {createProductValidator} from "../validator/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import multer from "multer"

const upload = multer({Storage:multer.memoryStorage(),
    limits:{
        files:5,
        fileSize: 1*1024*1024
    }
})
const router = Router();

router.post("/",
    
    authenticate,(req,res,next)=>{
    
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message:"you are not authorized to create product"
        })
    }
    next()
},


upload.array("images"),(req,res,next)=>{
    req.body?.price && (req.body.price=JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes=JSON.parse(req.body.sizes))
    next()
},


createProductValidator,
createProductController


)


export default router