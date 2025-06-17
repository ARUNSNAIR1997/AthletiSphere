const userSignupModel = require("../../model/user/userSignup.model")
const bcrypt = require("bcrypt");

exports.userInsert = async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let params={
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            firstnumber: req.body.firstnumber,
            secondnumber: req.body.secondnumber,
            address: req.body.address,
            gender: req.body.gender,
            state: req.body.state,
            district: req.body.district,
            country: req.body.country,
            pincode: req.body.pincode,
            dob: req.body.dob,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        }
        await userSignupModel.create(params)
        res.json("inserted")
    }catch(err){
        console.error(err);        
    }
}


exports.userLogin = async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await userSignupModel.findOne({email})

        if(!user){
            return res.status(401).json("invalid")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json("invalid")
        }

        if(user.role==="user"){
            req.session.user=user;
            return res.json(user)
        }else{
      return res.status(401).json("invalid")
        }
    }catch(err){
        console.error(err);
    }
}