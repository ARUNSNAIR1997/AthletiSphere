const mongoose = require("mongoose")

const footballSchema = mongoose.Schema({
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
        type: String,
        required:true
    },
    first_team_score:{
        type: Number
    },
    second_team_name:{
        type: String
    },
    second_team_logo:{
        type: String,
        required:true
    },
    second_team_score:{
        type: Number
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const footballModel = mongoose.model("football", footballSchema);
module.exports = footballModel; // ← exporting directly
