const { signupModel, loginModel } = require("../../model/admin/ownerSignup.model")
const bcrypt = require("bcrypt");


exports.signupIndex = async(req, res)=>{
    try{
        const signupParams ={
            Turf_Name: req.body.Turf_Name,
            Phone: req.body.Phone,
            Other_Number: req.body.Other_Number,
            Address: req.body.Address,
            District: req.body.District,
            State: req.body.State,
            Country: req.body.Country,
            Pincode: req.body.Pincode,
            Email: req.body.Email
        }
        const newSignup = await signupModel.create(signupParams)

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const loginParams ={
            Email: req.body.Email,
            Password: hashedPassword,
            Role: "owner",
            regId: newSignup._id
        }

        await loginModel.create(loginParams)

        res.json("successfully registered")
    }
    catch(error){
        console.error("error", error);
        res.status(500).json({error: "an error occured while registering"})
    }
}






// GET /sports/registerview
exports.signupView = async (req, res) => {
  try {
    const data = await loginModel.find().populate("regId");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};



//delete
exports.signupDelete = async(req,res)=>{
  try {
    const loginId = req.params.loginId;
    const loginRecord = await loginModel.findByIdAndDelete(loginId);
    if (loginRecord) {
      await signupModel.findByIdAndDelete(loginRecord.regId);
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
}


//edit
exports.signupEdit = async(req,res)=>{
    try{
        const loginId = req.params.loginId;
        let edit = await loginModel.findById(loginId).populate("regId")
        res.json(edit)
    }
    catch(err){
        console.error(err)
    }
}



//update
exports.signupUpdate = async(req,res)=>{
    try{
        const loginId = req.params.loginId;

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const login = await loginModel.findByIdAndUpdate(loginId,{
            Email: req.body.Email,
            Password: hashedPassword
        }, {new:true})

        

        const signup = await signupModel.findByIdAndUpdate(login.regId,{
            Turf_Name: req.body.Turf_Name,
      Phone: req.body.Phone,
      Other_Number: req.body.Other_Number,
      Address: req.body.Address,
      District: req.body.District,
      State: req.body.State,
      Country: req.body.Country,
      Pincode: req.body.Pincode
        }, {new:true})

        res.json({login,signup})
    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
}






