const { EnquiryModel } = require("../../models/Enquiry/Enquiry");

class enquiryController {
  //   async createenquiry(req, res) {
  //     try {
  //       const {
  //         userName,
  //         userID,
  //         pickuplocation,
  //         droplocation,
  //         date,
  //         time,
  //         selectbody,
  //       } = req.body;

  //       const newcourt = new EnquiryModel({
  //         userName,
  //         userID,
  //         pickuplocation,
  //         droplocation,
  //         date,
  //         time,
  //         selectbody,
  //       });

  //       await newcourt.save();

  //       res.status(200).json({
  //         message: "Successfully added Enquiry",
  //         data: newcourt,
  //       });
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  //   }

  async createenquiry(req, res) {
    try {
      console.log("Received Enquiry Data:", req.body); // 🔍 Log request data

      const {
        userName,
        userID,
        pickuplocation,
        droplocation,
        date,
        time,
        selectbody,
        distance,
        phoneNumbr,
        status,
      } = req.body;

      // if (
      //   !userName ||
      //   !userID ||
      //   !pickuplocation ||
      //   !droplocation ||
      //   !date ||
      //   !time ||
      //   !selectbody ||
      //   !phoneNumbr
      // ) {
      //   return res.status(400).json({ error: "Missing required fields" });
      // }

      const newEnquiry = new EnquiryModel({
        userName,
        userID,
        pickuplocation,
        droplocation,
        date,
        time,
        selectbody,
        distance,
        phoneNumbr,
        status,
      });

      await newEnquiry.save();

      res.status(200).json({
        message: "Successfully added Enquiry",
        data: newEnquiry,
      });
    } catch (error) {
      console.error("Backend Error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllenquiry(req, res) {
    try {
      const allenquiry = await EnquiryModel.find({});

      if (!allenquiry) {
        return res.status(400).json({ message: "No Enquiry found." });
      }

      res.status(200).json({ message: "All Enquiry", data: allenquiry });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Failed to get all Enquiry - " + e.message });
    }
  }

  async getAllFalseEnquiries(req, res) {
    try {
      const falseEnquiries = await EnquiryModel.find({ status: false });

      if (!falseEnquiries.length) {
        return res.status(404).json({ message: "No pending enquiries found." });
      }

      res
        .status(200)
        .json({ message: "Pending Enquiries", data: falseEnquiries });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Failed to get pending enquiries - " + e.message });
    }
  }

  async getAllTrueEnquiries(req, res) {
    try {
      const trueEnquiries = await EnquiryModel.find({ status: true });

      if (!trueEnquiries.length) {
        return res
          .status(404)
          .json({ message: "No confirmed enquiries found." });
      }

      res
        .status(200)
        .json({ message: "Confirmed Enquiries", data: trueEnquiries });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Failed to get confirmed enquiries - " + e.message });
    }
  }

  async updateEnquiryStatus(req, res) {
    try {
      const { id } = req.params;

      const updated = await EnquiryModel.findByIdAndUpdate(
        id,
        { status: true },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Enquiry not found" });
      }

      return res.status(200).json({
        message: "Status updated to true",
        data: updated,
      });
    } catch (error) {
      console.error("Error updating enquiry status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteenquiry(req, res) {
    try {
      const id = req.params.id;
      console.log("Received ID for deletion:", id);
      const member = await EnquiryModel.findByIdAndDelete({ _id: id });
      if (!member) {
        return res
          .status(404)
          .json({ status: false, message: "Member not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "enquiry deleted successfully" });
    } catch (error) {
      console.error("Error deleting member:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new enquiryController();
