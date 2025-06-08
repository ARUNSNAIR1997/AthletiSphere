const { adminSignupModel } = require("../../model/admin/adminSignup.model")
// const bcrypt = require("bcrypt");

exports.adminRegisterIndex = async(req, res)=>{
    try{
        let registerParams={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userStatus: req.body.userStatus
        }
        const newRegister = await adminSignupModel.create(registerParams)

        // const hashedPassword = await bcrypt.hash(req.body.password, 10);

        res.json("successfull")
    }catch(error){
        console.error("error", error);
        res.status(500).json({error: "an error occured while registering"})
    }
}



exports.adminLoginIndex = async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await adminSignupModel.findOne({email})

        if(!user){
            return res.status(401).json("invalid") // user not found
        }

        // Plain text password comparison
        if(password!==user.password){
            return res.status(401).json("invalid") // password mismatch
        }


        // Check if user is admin
        if(user.userStatus === "admin"){
            req.session.user=user;
            return res.json(user); // login success
        }else {
      return res.status(403).json("invalid"); // blocked or unauthorized user
    }
    }catch (err) {
    console.error(err);
    return res.status(500).json("server error");
  }
}