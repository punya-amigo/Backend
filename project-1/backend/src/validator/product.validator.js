import {body,validationResult} from "express-validator";

export const createProductValidator = [
    body("title")
     .exists().withMessage("Title is required").bail()
     .isString().withMessage("Title must be a string").bail()
     .trim()
     .isLength({min:3,max:100}).withMessage("Title must be between 3 to 100 characters ").bail()
     .isAlpha("en-US",{ignore:" -"}).withMessage("Title must be using only english characters"),
     body("description")
      .exists().withMessage("Description is required").bail()
     .isString().withMessage("Description must be a string").bail()
     .trim()
     .isLength({min:20,max:500}).withMessage("Description must be between 20 to 500 characters ").bail(),
     body("price.amount")
     .exists().withMessage("price must be required for listing a product").bail()
     .isFloat({min:0}).withMessage("price amount should be a floating number").bail(),
     body("price.currency")
     .exists().withMessage("currency is required for listing a product").bail()
     .isIn(["INR","USD" ]).withMessage("currency must be either INR or USD").bail()
     .isString().withMessage("currency must be a string").bail()
     .trim(),
     body("sizes")
     .exists().withMessage("sizes is required for listing a product").bail()
     .isArray({min:1}).withMessage("sizes must be an array with at least one element").bail(),
        body("sizes.*.size")
        .exists().withMessage("size is required for listing a product").bail()
        .isString().withMessage("size must be a string").bail()
        .trim()
        .isIn(["XS","S","M","L","XL","XXL","XXXL"]).withMessage("size must be one of the following: XS, S, M, L, XL, XXL, XXXL").bail(),
        body("sizes.*.stock")
        .exists().withMessage("stock is required for listing a product").bail()
        .isInt({min:0}).withMessage("stock must be a positive integer").bail(),
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
