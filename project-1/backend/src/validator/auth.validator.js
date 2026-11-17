import {body , validationResult} from "express-validator";

export const registerValidator = [
    body("email")
    .exists().withMessage("email is required").bail()
    .trim()
    .isEmail().withMessage("must be a valid email"),
    body("name")
    .exists().withMessage("name is reuqired").bail()
    .isString().withMessage("name must be a string")
    .trim()
    .isLength({min:2,max:50}).withMessage("characters must be between 2-50 characters"),
    body("password")
    .exists().withMessage("password is reuqired").bail()
    .isString().withMessage("password must be a string")
    .trim()
    .isLength({min:6}).withMessage("password must be at least 6 characters long"),
    (req,res,next)=>{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }

]

export const loginValidator = [
    body("email")
    .exists().withMessage("email is required").bail()
    .isString().withMessage("email must be a string").bail()
    .isEmail().withMessage("must be a valid email")
    .trim(),
    body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password must be a string").bail()
    .trim()
    .isLength({min:6}).withMessage("password must be at least 6 characters long"),
    (req,res,next)=>{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]