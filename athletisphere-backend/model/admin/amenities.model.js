const mongoose = require("mongoose")

const amenitiesSchema = mongoose.Schema({
    amenitie_name:{
        type:String,
        required:true
    },
    amenitie_icon:{
        type:String,
        required:true
    }
})

const amenitiesModel = mongoose.model("amenitie",amenitiesSchema)

module.exports=amenitiesModel