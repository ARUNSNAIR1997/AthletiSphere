const mongoose = require("mongoose")

const adminSignupSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
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

const adminSignupModel = mongoose.model("admin_signup",adminSignupSchema)

// const adminLoginSchema = mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     userStatus:{
//         type:String,
//         required:true
//     },
//     regId:{
//         type:String,
//         ref: "admin_signup",
//         required: true
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     }
// })

// const adminLoginModel = mongoose.model("admin_login",adminLoginSchema)


module.exports={adminSignupModel}