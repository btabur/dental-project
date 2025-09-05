const express = require("express");
const authMiddleware =require("../middlewares/authMiddleware")

const router = express.Router()

const authRoute = require("./authRoutes.js");
const userRoute = require("./userRoutes.js");
const appointmentRoute = require("./appointmentRoutes.js")


router.use("/auth",authRoute);
router.use("/user",authMiddleware,userRoute);
router.use("/appointment",authMiddleware,appointmentRoute)


module.exports= router;