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
        phoneNumber
      } = req.body;

      // if (
      //   !userName ||
      //   !userID ||
      //   !pickuplocation ||
      //   !droplocation ||
      //   !date ||
      //   !time ||
      //   !selectbody ||
      //   !phoneNumber
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
        phoneNumber
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

  //   async updateenquiry(req, res) {
  //     try {
  //       const id = req.params.id;
  //       const { courtname } = req.body;

  //       let courtupdate = await EnquiryModel.findOne({ _id: id });
  //       if (!courtupdate) {
  //         return res.status(404).json({
  //           status: 404,
  //           error: "Id not found",
  //         });
  //       }

  //       await EnquiryModel.findOneAndUpdate(
  //         { _id: courtId },
  //         {
  //           courtname,
  //         },
  //         {
  //           new: true,
  //         }
  //       );
  //       console.log("courtupdate", courtupdate);
  //       res.status(200).json({
  //         status: true,
  //         success: "Updated",
  //         data: courtupdate,
  //       });
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  //   }

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
