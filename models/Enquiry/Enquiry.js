const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema(
  {
    userName: { type: String },
    userID: { type: String },
    phoneNumbr: { type: String },
    pickuplocation: { type: String },
    droplocation: { type: String },
    date: { type: String },
    time: { type: String },
    selectbody: { type: String },
    distance: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const EnquiryModel = mongoose.model("enquiry", EnquirySchema);

module.exports = { EnquiryModel };
