var express = require("express")
var router = express.Router()


var ownerSignupController = require("../controller/admin/ownerSignup.controller")


router.post("/register",ownerSignupController.signupIndex)
router.get("/registerview",ownerSignupController.signupView)
router.delete("/registerdelete/:loginId",ownerSignupController.signupDelete)
router.post("/registeredit/:loginId",ownerSignupController.signupEdit)
router.post("/registerupdate/:loginId",ownerSignupController.signupUpdate)


module.exports=router