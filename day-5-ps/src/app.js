const express = require("express");
const connectDb = require("./config/db")
const NotesModel = require ("./models/notes.model")
    const app = express()
    connectDb();

    app.use(express.json());
app.post("/create", async(req,res)=>{
    try{
         const{title,description}=req.body;
         const newNote = await NotesModel.create({
            title,description
         })
         res.send({
            success:true,
            message:"note created successfully",
            data:newNote,
         })
    }
    catch(error){
        console.log("can not create hte note" , error)
    }
});

app.get("/",async (req,res)=>{
    try {
        const allNotes =  await NotesModel.find();
        res.send(allNotes)
    } catch (error) {
        console.log("can not find notes", error)
    }
});
    module.exports = app;