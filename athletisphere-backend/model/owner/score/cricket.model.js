const mongoose = require("mongoose")

const cricketSchema = mongoose.Schema({
    owner:{
        type: String
    },
    sports:{
        type: String
    },
    video:{
        type: String
    },
    first_team_name:{
        type: String
    },
    first_team_logo:{
        type: String
    },
    score:{
        type: Number
    },
    second_team_name:{
        type: String
    },
    second_team_logo:{
        type: String
    },
    over:{
        type: Number
    },
    ball:{
        type: Number
    },
    wicket:{
        type: Number
    }
})

const cricketModel = mongoose.model("cricket",cricketSchema)

module.exports=cricketModel