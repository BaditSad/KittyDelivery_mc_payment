const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticate = require('../middleware/authenticate');

// Restaurant routes
router.get('/', restaurantController.getRestaurants);
router.post('/', authenticate, restaurantController.createRestaurant);
router.put('/:id', authenticate, restaurantController.updateRestaurant);
router.delete('/:id', authenticate, restaurantController.deleteRestaurant);

module.exports = router;
