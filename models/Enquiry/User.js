const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  Phonenumber: { type: Number, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
