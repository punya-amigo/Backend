const express =require("express");

const {createNewNoteController , getAllNotesController ,UpdateSingleNoteController}= require("../controllers/notes.controller");

router = express.Router();

router.post("/create",createNewNoteController);
router.get("allNotes",getAllNotesController);
router.put("update",UpdateSingleNoteController);
module.exports = router ;