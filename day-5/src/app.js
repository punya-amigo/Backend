const express = require ("express");

const connectDb = require("./config/db");
const NotesModel = require("./models/notes.model");

    const app = express();

    connectDb();


    app.use(express.json());



app.post("/create",async(req,res)=>{
    const {title , description}=req.body;
    const  newNote = await NotesModel.create( {
        title,
        description,
    });
     
    res.send({
        success:true,
        message:"note created successfully",
        data:newNote,
    })
   
})
app.get("/",async(req,res)=>{
 
    const allNotes =  await NotesModel.find();
    res.send(allNotes)
   
})

module.exports = app;