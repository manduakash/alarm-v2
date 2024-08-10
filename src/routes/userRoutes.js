// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the API routes
router.get('/get-all-users', userController.getUsers);
router.post('/save-user', userController.createUser);
router.get('/get-user/:id', userController.getUserById);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.post('/logout', userController.logout);


module.exports = router;
