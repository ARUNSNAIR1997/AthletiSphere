var express = require("express")
var router = express.Router()

//owner signup
var ownerSignupController = require("../controller/admin/ownerSignup.controller")


router.post("/register",ownerSignupController.signupIndex)
router.get("/registerview",ownerSignupController.signupView)
router.delete("/registerdelete/:loginId",ownerSignupController.signupDelete)
router.post("/registeredit/:loginId",ownerSignupController.signupEdit)
router.post("/registerupdate/:loginId",ownerSignupController.signupUpdate)
router.post("/ownerlogin",ownerSignupController.signupLogin)


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
router.post("/venueupdate",venueController.venueUpdate)


//sports
var sportsController = require("../controller/admin/sports.contoller")

router.post("/sports",sportsController.sportsInsert)
router.get("/sportsview",sportsController.sportsView)
router.delete("/sportsdelete/:sportsId",sportsController.sportsDelete)
router.get("/sportsedit/:sportsId",sportsController.sportsEdit)
router.post("/sportsupdate",sportsController.sportsUpdate)


//turf
var turfController = require("../controller/owner/turf.controller")

router.post("/turf",turfController.turfInsert)
router.get("/turfview",turfController.turfView)
router.delete("/turfdelete/:turfId",turfController.turfDelete)
router.get("/turfedit/:turfId",turfController.turfEdit)
router.post("/turfupdate",turfController.turfUpdate)
router.get("/turfuserview",turfController.turfUserView)
router.delete("turfimagedelete/:index",turfController.turfImageDelete)


//user
var userController = require("../controller/user/userSignup.Controller")
var bookingController = require("../controller/user/booking.controller")
var postController = require("../controller/user/post.controller")
var paymentController = require("../controller/user/payment.controller")

router.post("/userregister",userController.userInsert)
router.post("/userlogin",userController.userLogin)
router.post("/booking",bookingController.bookingInsert)
router.get("/bookingview",bookingController.bookingView)
router.get("/bookstatus",bookingController.ownerBookingView)
router.delete("/bookdelete/:bookId",bookingController.ownerBookDelete)
router.post("/socialpost",postController.postInert)
router.get("/socialview",postController.postView)
router.put("/sociallike/:id", postController.likePost);
router.put("/socialcomment/:id", postController.commentPost);
router.get("/socialviewcomment/:commentId",postController.postViewComment)
router.post("/create-order",paymentController.createOrder)



//test
var testController = require("../controller/user/test.controller")

router.post("/test",testController.testInsert)


//score football
var footballController = require("../controller/owner/score/football.controller")

router.post("/footballscore",footballController.footballInsert)
router.get("/footballview/:matchId",footballController.footballView)
router.post("/footballupdate",footballController.footballUpdate)
router.get("/footballuser",footballController.userFootballView)

//cricket
var cricketController = require("../controller/owner/score/cricket.controller")

router.post("/cricketscore",cricketController.cricketInsert)
router.get("/cricketview/:matchId",cricketController.cricketView)
router.post("/cricketupdate",cricketController.cricketUpdate)
router.get("/cricketuser",cricketController.userCricketView)

module.exports=router