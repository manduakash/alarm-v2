// src/controllers/userController.js

const User = require("../models/userModel");

// get(all) api : starts
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: 1, message: 'Users Data fetched successfully', data: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// get(all) api : ends

// get(single) api : starts
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ status: 1, message: 'User Data fetched successfully', data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// get(single) api : ends

// save api : starts
exports.createUser = async (req, res) => {

  const { username } = req.body;
  const fetch = await User.findOne({ username });

  if(fetch){
    res.status(400).json({ status: 0, message: 'Username already exists' });
  }
  
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    panels: req.body.panels,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ status: 1, message: 'User added successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// save api : ends

// update api : starts
exports.updateUser = async (req, res) => {
  try {
    const fetch = await User.findById(req.params.id);

    if (fetch) {
      await User.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json({ status: 1, message: "User Updated successfully" });
    } else {
      res.status(404).json({ status: 0, message: "User Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};
// update api : ends

// delete api : starts
exports.deleteUser = async (req, res) => {
  try {
    const fetch = await User.findById(req.params.id);
    if (fetch) {
      await User.deleteOne({ _id: req.params.id });
      res.status(201).json({ status: 1, message: "User Deleted successfully" });
    } else {
      res.status(404).json({ status: 0 ,message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};
// delete api : ends


// Logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.tokens.token = "";
    await user.save();
    res.json({status: 1, message: "Logged out successfully" });
  }
  catch (error){
    console.log(error.message);
    res.status(500).json({status: 0, message: "Internal Server Error"});
  }
}