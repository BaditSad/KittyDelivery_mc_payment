const express = require('express');
const router = express.Router();
const neighborhoodController = require('../controllers/neighborhoodController');
const authenticate = require('../middleware/authenticate');

// Neighborhood routes
router.get('/', neighborhoodController.getNeighborhoods);
router.post('/', authenticate, neighborhoodController.createNeighborhood);
router.put('/:id', authenticate, neighborhoodController.updateNeighborhood);
router.delete('/:id', authenticate, neighborhoodController.deleteNeighborhood);

module.exports = router;
