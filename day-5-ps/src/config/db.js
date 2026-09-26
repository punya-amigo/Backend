const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://punyabest2256_db_user:chikki85@cluster0.wadwtqk.mongodb.net/");
        console.log("db connected succesfully")
    } catch (error) {
        console.log("db connection failed" , error)
    }
}
module.exports = connectDb ;
