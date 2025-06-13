const turfModel = require("../../model/owner/turf.model")
const path = require("path");

exports.turfInsert = async(req,res)=>{
    try{
      let imageNames = [];

    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    for (let file of files) {
      const uploadPath = path.join(__dirname, "../../public/img/", file.name);
      await file.mv(uploadPath);
      imageNames.push(file.name);
    }

    const newTurf = new turfModel({
      sports: req.body.sports,
      price: req.body.price,
      owner: req.body.owner,
      venues: req.body["venues[]"], // expected as array
      amenities: req.body["amenities[]"], // expected as array
      images: imageNames,
    });

    await newTurf.save();
    res.status(200).json({ message: "Turf created", turf: newTurf });
    }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}




exports.turfView = async(req,res)=>{
    try{
        let view = await turfModel.find()
        .populate("sports", "sports_name")
        .populate("venues", "venue_name")
        .populate("amenities", "amenitie_name")
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}
