const bookingModel = require("../../model/user/booking.model")

exports.bookingInsert = async(req,res)=>{
    try{
        await bookingModel.create(req.body)
        res.json("inserted")
    }catch(err){
        console.error(err);
        
    }
}

exports.bookingView = async(req,res)=>{
    try{
        let view = await bookingModel.find()
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}