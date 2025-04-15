const Admin = require("../../models/Enquiry/Adminuser");
const bcrypt = require("bcrypt");

class AuthController {
  async adminSignup(req, res) {
    try {
      console.log(req.body);

      const { userName, email, password } = req.body;

      if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await Admin.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Admin already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Admin.create({
        userName,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Admin created successfully!",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async adminSignin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ status: false, error: "Email and password are required." });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res
          .status(404)
          .json({ status: false, error: "Admin not found!" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ status: false, error: "Invalid password!" });
      }

      return res.status(200).json({
        status: true,
        message: "Admin signed in successfully!",
        data: { id: admin._id, email: admin.email, userName: admin.userName },
      });
    } catch (error) {
      console.error("Error signing in admin:", error);
      return res
        .status(500)
        .json({ status: false, error: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
