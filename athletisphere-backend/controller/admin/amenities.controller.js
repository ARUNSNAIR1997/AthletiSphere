const amenitiesModel = require("../../model/admin/amenities.model")
var path = require("path")

exports.amenitiesIndex= async(req,res)=>{
    try{
    const file = req.files.amenitie_icon.name
    const iconPath = path.join(__dirname,"../../public/img/" + file)
    req.files.amenitie_icon.mv(iconPath, async(err)=>{
        const params={
            amenitie_name:req.body.amenitie_name,
            amenitie_icon:file
        }
        try{
            await amenitiesModel.create(params)
            res.json("amenities uploaded")
        }
        catch(error){
                res.json({error: "failed to upload"})
            }
    })
    }
    catch(err){
        console.error(err)
    }
}


exports.amenitiesView = async(req,res)=>{
    try{
        const icon = await amenitiesModel.find()
        res.json(icon)
    }
    catch(err){
        console.error(err)
    }
}

exports.amenitiesDelete = async(req,res)=>{
    try{
        iconId = req.params.amenitieId
        await amenitiesModel.findByIdAndDelete(iconId)
        res.json({message: "Deleted successfully"})
    }
    catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
}


exports.amenitiesEdit = async(req,res)=>{
    try{
        iconId = req.params.amenitieId
        const edit = await amenitiesModel.findById(iconId)
        res.json(edit)
    }catch (err) {
    res.status(500).json({ error: "failed" });
  }
}



exports.amenitiesUpdate = async(req,res)=>{
    try{
        // const id = req.body.id;
      let imageName = req.body.existingAmenitie_icon;

    if (req.files && req.files.amenitie_icon) {
      const file = req.files.amenitie_icon;
      imageName = file.name;
      const imagePath = path.join(__dirname, "../../public/img/" + imageName);
      await file.mv(imagePath);
    }

    await amenitiesModel.findByIdAndUpdate(req.body.id, {
        amenitie_name:req.body.amenitie_name,
        amenitie_icon:imageName
    })
    res.json("Updated successfully");
    }
    catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
}