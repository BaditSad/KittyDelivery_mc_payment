const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const authenticate = require('../middleware/authenticate');

// City routes
router.get('/', cityController.getCities);
router.post('/', authenticate, cityController.createCity);
router.put('/:id', authenticate, cityController.updateCity);
router.delete('/:id', authenticate, cityController.deleteCity);

module.exports = router;
