import mongoose from "mongoose";
const  customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"name should be at least 3 characters long"],
    },
    email:{
        type:String,
        required:true,
         unique:true,
         match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    passwordHash:{
        type:String,
        required:true,
        minLength:[8,"password should be at least 8 characters long"],

    },
    refreshToken:{
        type:String
    }

})

const customerModel = mongoose.model("customers",customerSchema);

export default customerModel;