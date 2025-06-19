const mongoose = require("mongoose")


const turfSchema = mongoose.Schema({
  sports: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sport",
    required: true
  },
  venues: {
    type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "venue",
    required: true
  }],
  },
  amenities: {
    type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "amenitie",
    required: true
  }],
  },
  price: {
    type: Number,
  },
  images: {
    type: [String],
  },
  owner: {
    type: String,
  },
  turf_name:{
    type: String,
    required: true
  }
});

const turfModel = mongoose.model("turf",turfSchema)

module.exports=turfModel