const userSignupModel = require("../../model/user/userSignup.model")
const bcrypt = require("bcrypt");
var path = require("path")

// exports.userInsert = async(req,res)=>{
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         let params={
//             profile:req.body.profile,
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             firstnumber: req.body.firstnumber,
//             secondnumber: req.body.secondnumber,
//             address: req.body.address,
//             gender: req.body.gender,
//             state: req.body.state,
//             district: req.body.district,
//             country: req.body.country,
//             pincode: req.body.pincode,
//             dob: req.body.dob,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role
//         }
//         await userSignupModel.create(params)
//         res.json("inserted")
//     }catch(err){
//         console.error(err);        
//     }
// }



exports.userInsert = async(req,res)=>{
    try{
    const file = req.files.profile.name;
    const iconPath = path.join(__dirname,"../../public/img/" + file)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.files.profile.mv(iconPath, async(err)=>{
           const params={
            profile:file,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            firstnumber: req.body.firstnumber,
            secondnumber: req.body.secondnumber,
            address: req.body.address,
            gender: req.body.gender,
            // state: req.body.state,
            // district: req.body.district,
            // country: req.body.country,
            // pincode: req.body.pincode,
            location: req.body.location,
            dob: req.body.dob,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
           }
           try{
            await userSignupModel.create(params)
            res.json("inserted")
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