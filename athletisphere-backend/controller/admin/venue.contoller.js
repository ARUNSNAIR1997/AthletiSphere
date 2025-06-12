const venueModel = require("../../model/admin/venue.model")
var path = require("path")

exports.venueInsert = async(req,res)=>{
    try{
    const file = req.files.venue_icon.name;
    const iconPath = path.join(__dirname,"../../public/img/" + file)
    req.files.venue_icon.mv(iconPath, async(err)=>{
           const params={
            venue_sports:req.body.venue_sports,
            venue_name:req.body.venue_name,
            venue_icon:file
           }
           try{
            await venueModel.create(params)
            res.json("venue inserted")
           }
           catch(error){
                res.json({error: "failed to upload"})
            }
    })
    }
    catch(err){
        console.error(err);
        
    }
}



exports.venueView = async(req,res)=>{
    try{
        let view = await venueModel.find().populate("venue_sports", "sports_name")
        res.json(view)
    }
    catch(err){
        console.error(err);
        
    }
}


exports.venueDelete = async(req,res)=>{
    try{
        venueID = req.params.venueId;
        await venueModel.findByIdAndDelete(venueID)
        res.json("deleted")
    }
    catch(err){
        console.error(err);
        
    }
}


exports.venueEdit = async(req,res)=>{
    try{
        venueID = req.params.venueId;
        let edit = await venueModel.findById(venueID)
        res.json(edit)
    }catch(err){
        console.error(err);
        
    }
}


exports.venueUpdate = async(req,res)=>{
    try{
        let imageName = req.body.existingVenue_icon;
        if(req.files && req.files.venue_icon){
            const file = req.files.venue_icon
            imageName = file.name
            const imagePath = path.join(__dirname,"../../public/img/" + imageName)
            await file.mv(imagePath)
        }
        await venueModel.findByIdAndUpdate(req.body.id, {
            venue_sports:req.body.venue_sports,
            venue_name: req.body.venue_name,
            venue_icon: imageName
        })
        res.json("update successfully")
    }catch(error){
        res.status(500).json({error: "update failed"})
    }
}