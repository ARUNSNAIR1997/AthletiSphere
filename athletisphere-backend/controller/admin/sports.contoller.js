const sportsModel = require("../../model/admin/sports.model")
var path = require("path")


exports.sportsInsert = async(req,res)=>{
    try{
        const file =  req.files.sports_image;
        const imageName = file.name;
        const imagePath = path.join(__dirname,"../../public/img/" + imageName)
        await file.mv(imagePath)

        const params = {
            sports_name:req.body.sports_name,
            sports_image:imageName,
            sports_despt:req.body.sports_despt
        }
        await sportsModel.create(params)
        res.json("sports details inserted successfully")
    }catch(error){
        res.json({error: "failed"})
    }
}



exports.sportsView = async(req,res)=>{
    try{
        let view = await sportsModel.find()
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}


exports.sportsDelete = async(req,res)=>{
    try{
        const sportsId = req.params.sportsId;
        await sportsModel.findByIdAndDelete(sportsId)
        res.json({message: "deleted successfully"})
    }catch(err){
        res.status(500).json({error: "failed"})
    }
}



exports.sportsEdit = async(req,res)=>{
    try{
        const sportsId = req.params.sportsId;
        const edit = await sportsModel.findById(sportsId)
        res.json(edit)
    }catch(err){
        console.error(err);
        
    }
}


exports.sportsUpdate = async(req,res)=>{
    try{
        let imageName = req.body.existingSports_image;
        if(req.files && req.files.sports_image){
            const file = req.files.sports_image;
            imageName = file.name;
            const imagePath = path.join(__dirname,"../../public/img/" + imageName)
            await file.mv(imagePath)
        }
        const params={
            sports_name:req.body.sports_name,
            sports_image:imageName,
            sports_despt:req.body.sports_despt
        }
        await sportsModel.findByIdAndUpdate(req.body.id, params)
        res.json("update successfully")
    }catch(err){
        console.error(err);
        
    }
}