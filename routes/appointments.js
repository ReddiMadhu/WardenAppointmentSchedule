const Myappointments = require('../controllers/userAppointmentsController');

const express = require('express');
const router = express.Router();


router.get("/",Myappointments.userAppointmentsController);
module.exports = router;
