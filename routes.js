const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/appointments', controller.renderAppointments);
router.get('/', controller.renderHome);



module.exports = router;