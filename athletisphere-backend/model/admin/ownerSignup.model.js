const mongoose = require("mongoose")

const signupSchema = mongoose.Schema({
    Turf_Name:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Other_Number:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    District:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    Pincode:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const signupModel = mongoose.model("owner_signup",signupSchema)


module.exports=signupModel


