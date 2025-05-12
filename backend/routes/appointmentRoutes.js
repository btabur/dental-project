const express = require("express");
const {createAppointment} = require("../controllers/appointmentController");


const router = express.Router();



router.post("/create", createAppointment);




module.exports = router;