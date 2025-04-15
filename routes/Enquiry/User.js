const { Router } = require("express");
const router = Router();
const UserController = require("../../Controllers/Enquiry/User");

router.post("/usersignup", UserController.UserSignup);
router.post("/usersignin", UserController.UserSignin);

module.exports = router;
