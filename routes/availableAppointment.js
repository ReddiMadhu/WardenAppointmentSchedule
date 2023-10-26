const express = require('express');
const router = express.Router();
const checkAvailablity = require('../controllers/bookingAvailabilityController');

router.post("/",checkAvailablity.bookingAvailabilityController);

module.exports = router;
