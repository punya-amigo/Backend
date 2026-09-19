const express = require("express");
const app = express();

app.use(express.json());

let users = []

app.post("/create", (req,res)=> {
    let body = req.body;
    users.push(body)

    res.send("user saved successfully");
})
app.get("/",(req,res)=>{
    res.send(users)
})

app.delete("/delete/:id",(req,res)=>{
    let {id}=req.params
    userData =users.filter((val)=> val.id!==id )
    users=userData;   
    res.send(users)

})

app.put("/update/:id",(req,res)=>{
    let {id}=req.params ;
    let {name}=req.body;
    let updatedData = users.map ((val)=>{
        val.id===id ? {...val , name} : val

    });
    users=updatedData;
    res.send(users)
})
port =3000;

app.listen(port , ()=>{
    console.log(`server is succefully running on port ${port}`)
})