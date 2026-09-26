require("dotenv").config();
let app = require("./src/app");

port = process.env.PORT || 3000 ;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})