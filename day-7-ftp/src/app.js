const express = require("express");
const routerRoutes = require("./routes/user.routes")

const app = express()

app.use(express.json());
app.use("/notes",routerRoutes);
module.exports = app ; 
