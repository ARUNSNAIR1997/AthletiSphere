const mongoose = require("mongoose")

function dbase(){
    mongoose.connect("mongodb://localhost:27017/athletisphere").then((result)=>{
        console.log("successfully connected");
        
    }).catch(err=>console.error(err))
}

module.exports=dbase