const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

// GET routets
router.get('/gallery', controller.renderGallery);
router.get('/services', controller.renderServices);
router.get('/appointments', controller.renderAppointments);
router.get('/', controller.renderHome);

// POST routes
router.post('/newinquiry', controller.sendInquiry);


module.exports = router;