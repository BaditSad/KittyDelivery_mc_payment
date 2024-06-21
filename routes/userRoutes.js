const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to get all user
router.get('/', userController.getAllUsers);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to logout a user
router.put('/logout/:id', userController.logoutUser);

// Route to soft delete a user
router.put('/delete/:id', userController.deleteUser);

module.exports = router;
