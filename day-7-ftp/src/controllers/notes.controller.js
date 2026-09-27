const createUser = (req,res)=>{
    console.log(
        "user saved successfully"
    )

    console.log(req.file)
    res.send("user saved successfully ")
}

module.exports= createUser ;