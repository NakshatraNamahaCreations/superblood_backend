const express = require("express");
const router = express.Router();
const enquiryController = require("../../Controllers/Enquiry/Enquiry");

router.post("/createenquiry", enquiryController.createenquiry);
router.get("/getAllenquiry", enquiryController.getAllenquiry);
router.delete("/deleteenquiry/:id", enquiryController.deleteenquiry);

module.exports = router;
