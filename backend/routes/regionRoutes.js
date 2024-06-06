const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');
const authenticate = require('../middleware/authenticate');

// Region routes
router.get('/', regionController.getRegions);
router.post('/', authenticate, regionController.createRegion);
router.put('/:id', authenticate, regionController.updateRegion);
router.delete('/:id', authenticate, regionController.deleteRegion);

module.exports = router;
