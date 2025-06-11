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


//amenities
var amenitiesController = require("../controller/admin/amenities.controller")

router.post("/amenities",amenitiesController.amenitiesIndex)
router.get("/amenitiesview",amenitiesController.amenitiesView)
router.delete("/amenitiesdelete/:amenitieId",amenitiesController.amenitiesDelete)
router.get("/amenitiesedit/:amenitieId",amenitiesController.amenitiesEdit)
router.post("/amenitiesupdate",amenitiesController.amenitiesUpdate)


//venue
var venueController = require("../controller/admin/venue.contoller")

router.post("/venue",venueController.venueInsert)
router.get("/venueview",venueController.venueView)
router.delete("/venuedelete/:venueId",venueController.venueDelete)
router.get("/venueedit/:venueId",venueController.venueEdit)


module.exports=router