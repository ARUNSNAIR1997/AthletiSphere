const bookingModel = require("../../model/user/booking.model")

exports.bookingInsert = async(req,res)=>{
    try{
        await bookingModel.create(req.body)
        res.json("inserted")
    }catch(err){
        console.error(err);
        
    }
}

//user status view
exports.bookingView = async(req,res)=>{
    try{
        const userId = req.query.user;
        let view = await bookingModel.find({user: userId})
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}



//owner status view
exports.ownerBookingView = async(req,res)=>{
    try{
        const turf_name = req.query.turf;
        let view = await bookingModel.find({turf: turf_name})
        res.json(view)
    }catch(err){
        console.error(err);
        
    }
}



//owner status delete
exports.ownerBookDelete = async(req,res)=>{
  try{
    const bookId = req.params.bookId;
    await bookingModel.findByIdAndDelete(bookId)
    res.json("deleted")
  }catch(err){
    console.error(err);
  }
}


