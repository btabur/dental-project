const express = require("express");

const router = express.Router()

const authRoute = require("./authRoutes.js");
const userRoute = require("./userRoutes.js");
const appointmentRoute = require("./appointmentRoutes.js")


router.use("/auth",authRoute);
router.use("/user",userRoute);
router.use("/appointment",appointmentRoute)


module.exports= router;