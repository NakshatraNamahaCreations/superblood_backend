const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema(
  {
    userName: { type: String },
    userID: { type: String },
    phoneNumber: { type: String },
    pickuplocation: { type: String },
    droplocation: { type: String },
    date: { type: String },
    time: { type: String },
    selectbody: { type: String },
    distance: { type: String },
  },
  {
    timestamps: true,
  }
);

const EnquiryModel = mongoose.model("enquiry", EnquirySchema);

module.exports = { EnquiryModel };
