const mongoose = require ("mongoose");

const notesSchema = new mongoose.Schema({
    title:{
        require:true,
        type:String,
    },
    description:{
        required:true,
        type:String,
        minlength:14
    }
});

const NotesModel = mongoose.model("notes",notesSchema);

module.exports = NotesModel ; 
