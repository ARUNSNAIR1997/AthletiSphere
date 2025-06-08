var express = require("express")
var router = express.Router()

//owner signup
var ownerSignupController = require("../controller/admin/ownerSignup.controller")


router.post("/register",ownerSignupController.signupIndex)
router.get("/registerview",ownerSignupController.signupView)
router.delete("/registerdelete/:loginId",ownerSignupController.signupDelete)
router.post("/registeredit/:loginId",ownerSignupController.signupEdit)
router.post("/registerupdate/:loginId",ownerSignupController.signupUpdate)


//admin register
var adminSignupController = require("../controller/admin/adminSignup.controller")

router.post("/adminregister",adminSignupController.adminRegisterIndex)
router.post("/adminlogin",adminSignupController.adminLoginIndex)


module.exports=router