const mongoose = require("mongoose")

const sportsSchema = mongoose.Schema({
    sports_name:{
        type: String,
        required:true
    },
    sports_image:{
        type:String,
        required:true
    },
    sports_despt:{
        type:String,
        required:true
    }
})

const sportsModel = mongoose.model("sport",sportsSchema)

module.exports=sportsModel