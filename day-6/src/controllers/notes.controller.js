
const NotesModel = require("../models/notes.model");

const createNewNoteController = async(req,res)=>{
    try {
        const {title,description}= req.body
         const newNote = await NotesModel.create ({
            title,description,
        })
        return res.status(201).json({
            message:"note created successfully",
            data:newNote,
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
const getAllNotesController = async (req,res)=>{
    try {
        const allNotes =await NotesModel.find()
          return res.status(200).json({
            message:"all notes are fetched",
            data:allNotes
          })
   } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

const UpdateSingleNoteController = async (req,res)=>{
    try {
        let noteId = req.params.id
        let body = req.body
        let UpdatedNote = NotesModel.findByIdAndUpdate(noteId , body)
        return res.status(201).json({
            message:"updatedsuccesfully",
            data:UpdatedNote

        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


module.exports ={ createNewNoteController,getAllNotesController,UpdateSingleNoteController};