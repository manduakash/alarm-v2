// models/Panel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  pid: { type: String, required: true, unique: true },
  b0: { type: Number, default: 0 },
  b1: { type: Number, default: 0 },
  b2: { type: Number, default: 0 },
  b3: { type: Number, default: 0 },
  b4: { type: Number, default: 0 },
  b5: { type: Number, default: 0 },
  b6: { type: Number, default: 0 },
  b7: { type: Number, default: 0 },
  b8: { type: Number, default: 0 },
  b9: { type: Number, default: 0 },
  b10: { type: Number, default: 0 },
  b11: { type: Number, default: 0 },
  b12: { type: Number, default: 0 },
  b13: { type: Number, default: 0 },
  b14: { type: Number, default: 0 }
});

module.exports = mongoose.model('Panel', panelSchema);
