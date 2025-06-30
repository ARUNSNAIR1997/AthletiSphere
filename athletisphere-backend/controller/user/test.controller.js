const Order = require("../../model/user/test.model")

// exports.testInsert = async(req,res)=>{
//         try {
//     const {
//       load,
//       startlocation,
//       endlocation,
//       goddownid,
//       startLat,
//       startLng,
//       endLat,
//       endLng,
//     } = req.body;

//     // Simple validation
//     if (!startLat || !startLng || !endLat || !endLng) {
//       return res.status(400).json({ error: "Incomplete location data" });
//     }

//     // TODO: Insert into DB here instead of console.log
//     const newOrder = {
//       load,
//       startlocation,
//       endlocation,
//       goddownid,
//       startLat,
//       startLng,
//       endLat,
//       endLng,
//       createdAt: new Date(),
//     };
//     console.log("Adding order:", newOrder);

//     // Simulate DB insert success
//     return res.status(201).json({
//       success: true,
//       message: "Order added",
//       order: newOrder,
//     });
//   } catch (err) {
//     console.error("Error in /goddown/addorder:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }


exports.testInsert = async (req, res) => {
  try {
    const {
      load,
      startlocation,
      endlocation,
      goddownid,
      startLat,
      startLng,
      endLat,
      endLng,
    } = req.body;

    if (!startLat || !startLng || !endLat || !endLng) {
      return res.status(400).json({ error: "Incomplete location data" });
    }

    const newOrder = await Order.create({
      load,
      startlocation,
      endlocation,
      goddownid,
      startLat,
      startLng,
      endLat,
      endLng,
    });

    return res.status(201).json({
      success: true,
      message: "Order added",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error in /goddown/addorder:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
