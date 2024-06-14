const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to create a new user
router.post('/', userController.createUser);

// Route to delete a user by ID
router.put('/:id', userController.deleteUser);

module.exports = router;
