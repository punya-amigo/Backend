import productModel from "../models/product.model.js";

export async function createProductController(req,res){
    
   const{title,description,price,sizes,images}=req.files

   productModel.create
}