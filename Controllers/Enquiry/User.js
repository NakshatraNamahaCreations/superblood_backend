const User = require("../../models/Enquiry/User");
const bcrypt = require("bcrypt");

class UserController {
  async UserSignup(req, res) {
    try {
      const { userName, Phonenumber, password } = req.body;

      if (!userName || !Phonenumber || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await User.findOne({ Phonenumber });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        userName,
        Phonenumber,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User created successfully!",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async UserSignin(req, res) {
    try {
      const { Phonenumber, password } = req.body;

      if (!Phonenumber || !password) {
        return res
          .status(400)
          .json({
            status: false,
            error: "Phone number and password are required.",
          });
      }

      const existingUser = await User.findOne({ Phonenumber });

      if (!existingUser) {
        return res
          .status(404)
          .json({ status: false, error: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ status: false, error: "Invalid password!" });
      }

      return res.status(200).json({
        status: true,
        message: "User signed in successfully!",
        data: {
          id: existingUser._id,
          userName: existingUser.userName,
          Phonenumber: existingUser.Phonenumber,
        },
      });
    } catch (error) {
      console.error("Error signing in user:", error);
      return res
        .status(500)
        .json({ status: false, error: "Internal server error" });
    }
  }
}

module.exports = new UserController();
