const express = require("express");
const createUser = require("../controllers/notes.controller")
const upload = require("../config/multer")
const router = express.Router() ;

router.post("/create",upload.single("image") ,createUser)

module.exports = router