
const express = require("express");
const connectDb = require ("./config/db");
const notesRoute = require("./routes/notes.routes")
    const app = express();

    app.use(express.json)

connectDb();

app.use("/notes",notesRoute)


module.exports = app;