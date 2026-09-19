const express = require ("express");
    const app = express();

    app.use(express.json());

    app.get ("/", (req,res)=>
    {
        res.send("you are here")
    })

    app.post("/create",(req,res)=>{
        res.send("ok post")
        console.log(req.body)
    })

    port = 3000;
    
    app.listen(port , ()=>{
        console.log(`server is running on port ${port}`)
    })
