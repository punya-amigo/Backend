const mongoose = require("mongoose")

const connectDb = async ()=>{
    try
    {
        await mongoose.connect("mongodb+srv://punyabest2256_db_user:chikki85@cluster0.wadwtqk.mongodb.net/")
    console.log("db connected successfully")
    }

    catch (error) {
        console.error("Error connecting to db:", error)
    }
}

module.exports = connectDb;