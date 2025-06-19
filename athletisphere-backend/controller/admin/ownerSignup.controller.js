const signupModel = require("../../model/admin/ownerSignup.model")
const bcrypt = require("bcrypt");


exports.signupIndex = async(req, res)=>{
    try{
       const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const signupParams ={
            Turf_Name: req.body.Turf_Name,
            Phone: req.body.Phone,
            Other_Number: req.body.Other_Number,
            Address: req.body.Address,
            District: req.body.District,
            State: req.body.State,
            Country: req.body.Country,
            Pincode: req.body.Pincode,
            Email: req.body.Email,
            Password: hashedPassword,
            role: req.body.role
        }
        await signupModel.create(signupParams)

        res.json("successfully registered")
    }
    catch(error){
        console.error("error", error);
        res.status(500).json({error: "an error occured while registering"})
    }
}




exports.signupLogin = async(req, res) => {
  try {
    const { Email, Password } = req.body;

    console.log("➡️ Login request received");
    console.log("Email:", Email);
    console.log("Password (plain):", Password);

    const user = await signupModel.findOne({ Email });  // Step 1: User Lookup

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json("invalid");           // Step 2: Email not found
    }

    console.log("✅ User found:", user);

    const isMatch = await bcrypt.compare(Password, user.Password); // Step 3: Password check
    if (!isMatch) {
      console.log("❌ Password incorrect");
      return res.status(401).json("invalid");            // Step 4: Wrong password
    }

    if (user.role === "owner") {  
      console.log("✅ Role is owner");                       // Step 5: Role check
      req.session.user = user;
      return res.json(user);                             // ✅ Login success
    } else {
      return res.status(401).json("invalid");            // Step 6: Role mismatch
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("server error");
  }
};








// GET /sports/registerview
exports.signupView = async (req, res) => {
  try {
    const data = await signupModel.find()
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
    await signupModel.findByIdAndDelete(loginId);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
}


//edit
exports.signupEdit = async(req,res)=>{
    try{
        const loginId = req.params.loginId;
        let edit = await signupModel.findById(loginId)
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

        // const login = await signupModel.findByIdAndUpdate(loginId,{
        //     Email: req.body.Email,
        //     Password: hashedPassword
        // }, {new:true})

        

        const signup = await signupModel.findByIdAndUpdate(loginId,{
            Turf_Name: req.body.Turf_Name,
      Phone: req.body.Phone,
      Other_Number: req.body.Other_Number,
      Address: req.body.Address,
      District: req.body.District,
      State: req.body.State,
      Country: req.body.Country,
      Pincode: req.body.Pincode,
      Email: req.body.Email,
      Password: hashedPassword
        }, {new:true})

        res.json({signup})
    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
}






