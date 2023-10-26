const express = require('express');
const router = express.Router();
const AppointmentBooking = require('../controllers/bookeAppointmenttController');

router.post("/", AppointmentBooking.bookAppointmentController);
module.exports = router;
