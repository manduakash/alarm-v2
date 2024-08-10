// src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 2, // 1 == admin & 2 == user
  },
  // can see only assigned panels
  panels: {
    type: Array,
    default: [],
  },
  tokens: [{
    token: {
      type: String,
      required: false
    }
  }]
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// Method to generate authentication token
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '3h' });
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
