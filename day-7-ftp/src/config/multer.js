const multer = require("multer");

const storageforLocal = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname);
    }
});

const storageForServer = multer.memoryStorage


const upload = multer({storage:storageForServer}); 


module.exports= upload;
