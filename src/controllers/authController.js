// src/controllers/authController.js

const User = require("../models/userModel");

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ status: 0, message: "Invalid username", data: null });
    }
    const isValidPassword = await user.comparePassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({status: 0, message: "Invalid password", data: null });
    }
    const token = await user.generateToken();
    res.json({ status: 1, message: "Logged in successfully", data: { token: token, user_id: user._id, username: user.username, user_role: user.role, panels: user.panels } });
  } catch (error) {
    res.status(500).json({status: 0, message: "Login failed", message: "Internal Server Error", data: null });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    user.tokens = user.tokens.filter(token => token.token !== req.token);
    await user.save();
    res.json({ status: 1, message: "Logged out successfully", data: null });
    } catch (error) {
      res.status(500).json({status: 0, message: "Logout failed", data: null});
    }
  }
