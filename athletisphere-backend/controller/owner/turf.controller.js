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
      location: req.body.location,
      venues: req.body["venues[]"], // expected as array
      amenities: req.body["amenities[]"], // expected as array
      images: imageNames,
      turf_name: req.body.turf_name
    });

    await newTurf.save();
    res.status(200).json({ message: "Turf created", turf: newTurf });
    }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}



//owner view
exports.turfView = async(req,res)=>{
    try{
      const ownerId = req.query.owner;
        let view = await turfModel.find({owner: ownerId})
        .populate("sports", "sports_name")
        .populate("venues", "venue_name")
        .populate("amenities", "amenitie_name")
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}


//user view
exports.turfUserView = async(req,res)=>{
    try{
      const sportsId = req.query.sports;
        let view = await turfModel.find({sports: sportsId})
        .populate("sports", "sports_name")
        .populate("venues", "venue_name")
        .populate("amenities", "amenitie_name")
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}



//delete
exports.turfDelete = async(req,res)=>{
  try{
    const turfId = req.params.turfId;
    await turfModel.findByIdAndDelete(turfId)
    res.json("deleted")
  }catch(err){
    console.error(err);
  }
}



//owner image delete
exports.turfImageDelete = async(req,res)=>{
  try{
    const indexId = req.params.index;
    await turfModel.findByIdAndDelete(indexId)
    res.json("deleted")
  }catch(err){
    console.error(err);
  }
}



//edit
exports.turfEdit = async(req,res)=>{
  try{
    const turfId = req.params.turfId;
    const edit = await turfModel.findById(turfId)
    .populate("sports", "sports_name")
    .populate("venues")
    .populate("amenities")
    .populate("owner")
    res.json(edit)
  }catch(err){
    console.error(err);
  }
}


exports.turfUpdate = async(req,res)=>{
  try{
    let imageNames = [];

    // Handle new uploaded images
    const files = Array.isArray(req.files?.images) ? req.files.images : (req.files?.images ? [req.files.images] : []);
    for (let file of files) {
      const uploadPath = path.join(__dirname, "../../public/img/", file.name);
      await file.mv(uploadPath);
      imageNames.push(file.name);
    }


    // Add existing image names (if any)
    const existingImages = req.body["existingImages[]"];
    if (existingImages) {
      if (Array.isArray(existingImages)) {
        imageNames = imageNames.concat(existingImages);
      } else {
        imageNames.push(existingImages);
      }
    }

    await turfModel.findByIdAndUpdate(req.body.id,{
      sports: req.body.sports,
      price: req.body.price,
      venues: req.body["venues[]"], // expected as array
      amenities: req.body["amenities[]"], // expected as array
      images: imageNames
    })
    res.json({ message: "Turf updated successfully" });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: "Server error while updating turf" });
  }
}