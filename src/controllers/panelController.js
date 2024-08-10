// src/controllers/apiController.js
const Panel = require('../models/panelModel');

// Get all panels
exports.getAllPanels = async (req, res) => {
  try {
    const panels = await Panel.find();
    res.json({ status: 1, message: 'Data fetched successfully', data: panels });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

// Create panel
exports.createPanel = async (req, res) => {
  const { pid } = req.query;
  // find by panel id 
  const fetch = await Panel.findOne({ pid });
  if (fetch) {
    return res.status(400).json({ status: 0, message: 'Panel already exists', data: null });
  }
  else{
    var panel = new Panel({
      pid: req.query.pid,
      b0: req.query.b0,
      b1: req.query.b1,
      b2: req.query.b2,
      b3: req.query.b3,
      b4: req.query.b4,
      b5: req.query.b5,
      b6: req.query.b6,
      b7: req.query.b7,
      b8: req.query.b8,
      b9: req.query.b9,
      b10: req.query.b10,
      b11: req.query.b11,
      b12: req.query.b12,
      b13: req.query.b13,
      b14: req.query.b14
    });
  }
  try {
    const newPanel = await panel.save();
    res.status(201).json({ status: 1, message: 'Data added successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

exports.getPanelById = async (req, res) => {
  try {
    const { pid } = req.query;
    const panel = await Panel.findOne({pid});
    res.json({ status: 1, message: 'Data fetched successfully', data: panel });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

exports.updatePanel = async (req, res) => {
  try {
    const { pid } = req.body;
    console.log('body:', req.body)
    const fetch = await Panel.findOne({pid});
    if (fetch) {
      await Panel.updateOne({ pid: req.body.pid }, { $set: req.body });
      res.status(201).json({ status: 1, message: "Updated successfully" });
    } else {
      res.status(404).json({ status: 0, message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};

exports.deletePanel = async (req, res) => {
  try {
    const { pid } = req.query;
    const fetch = await Panel.findOne({pid});
    if (fetch) {
      await Panel.deleteOne({ pid: req.query.pid });
      res.status(201).json({ status: 1, message: "Deleted successfully" });
    } else {
      res.status(404).json({ status: 0 ,message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};

