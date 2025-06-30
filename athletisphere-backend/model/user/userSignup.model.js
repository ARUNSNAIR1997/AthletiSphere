const mongoose = require("mongoose")

const userSignupSchema = mongoose.Schema({
    profile:{
        type: String
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    firstnumber:{
        type: String,
        required: true
    },
    secondnumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    gender:{
        type: String
    },
    // state:{
    //     type: String,
    //     required: true
    // },
    // district:{
    //     type: String,
    //     required: true
    // },
    // country:{
    //     type: String,
    //     required: true
    // },
    location:{
        type: String,
        required: true
    },
    // pincode:{
    //     type: String,
    //     required: true
    // },
    dob:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
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

const userSignupModel = mongoose.model("userlogin",userSignupSchema)

module.exports=userSignupModel