import mongoose from "mongoose";

const urlSchema = new mongoose.Schema ({
    originalurl:{
        type:String,
        required:true
    },
    shortcode:{
        type:String,
        required:true
    },
    clicks:{
        type:Number, 
        default:0
    }
},{
    timestamps:true
})


const urlModel = mongoose.model("url",urlSchema);

export default urlModel ;
