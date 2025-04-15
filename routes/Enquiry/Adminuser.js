const { Router } = require("express");
const router = Router();
const authController = require("../../Controllers/Enquiry/Adminuser");

router.post("/signup", authController.adminSignup);
router.post("/signin", authController.adminSignin);

module.exports = router;
