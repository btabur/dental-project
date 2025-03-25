const express = require("express");

const router = express.Router()

const authRoute = require("./authRoutes.js");
const userRoute = require("./userRoutes.js")


router.use("/auth",authRoute);
router.use("/user",userRoute)


module.exports= router;