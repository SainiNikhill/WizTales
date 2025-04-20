const multer = require('multer');
const path = require('path')

// storage config

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads'); // destination folders for storing uploaded files
    },
    filename: function (req, file,cb){
        cb(null , Date.now()+ path.extname(file.originalname));

    },

});

//file filter to accept only images
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true);

    } else{
        cb(new Error("only images are allowed"), false);
    }
};

//initialize multer instance
const upload = multer({ storage , fileFilter});

module.exports = upload;