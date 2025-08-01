const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  load: String,
  startlocation: String,
  endlocation: String,
  goddownid: String,
  startLat: Number,
  startLng: Number,
  endLat: Number,
  endLng: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports=Order