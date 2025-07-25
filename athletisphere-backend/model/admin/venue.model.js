const mongoose = require("mongoose")

const venueSchema = mongoose.Schema({
    venue_sports:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sport",
        required: true
    },
    venue_name:{
        type:String,
        required:true
    },
    venue_icon:{
        type:String,
        required:true
    }
})

const venueModel = mongoose.model("venue",venueSchema)

module.exports=venueModel