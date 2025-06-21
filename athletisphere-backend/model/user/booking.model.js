const mongoose = require("mongoose")


const bookingSchema = mongoose.Schema({
    turf:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    sports:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    persons:{
        type: String,
        required: true
    },
    total_amount:{
        type: Number
    },
    user:{
        type: String
    },
    // owner:{
    //     type: String
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const bookingModel = mongoose.model("booking",bookingSchema)

module.exports=bookingModel