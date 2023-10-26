const Myappointments = require('../controllers/updateStatusController');

const express = require('express');
const router = express.Router();


router.post("/",Myappointments.updateStatusController);
module.exports = router;