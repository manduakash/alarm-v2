// src/routes/panelRoutes.js

const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');

// Panel routes
router.get('/get-all-panels', panelController.getAllPanels);
router.get('/save-panel', panelController.createPanel);
router.get('/get-panel', panelController.getPanelById);
router.post('/update-panel', panelController.updatePanel);
router.get('/delete-panel', panelController.deletePanel);

module.exports = router;
