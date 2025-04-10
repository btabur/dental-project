const express = require("express");
const { register,login, logOut,forgetPassword,resetPassword } = require("../controllers/authController");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/forget-password",forgetPassword);
router.post("/reset-password",resetPassword);


module.exports = router;