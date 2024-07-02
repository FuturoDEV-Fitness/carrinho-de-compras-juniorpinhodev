const express = require('express');
const router = express.Router();
const { createClient } = require('../controllers/ClientController');

router.post('/clients', createClient);

module.exports = router;
