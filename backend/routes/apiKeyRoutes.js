const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/apiKeyController');
const authenticate = require('../middleware/authenticate');

// API Key routes
router.get('/', authenticate, apiKeyController.getApiKeys);
router.post('/', authenticate, apiKeyController.createApiKey);
router.put('/:id', authenticate, apiKeyController.updateApiKey);
router.delete('/:id', authenticate, apiKeyController.deleteApiKey);

module.exports = router;
