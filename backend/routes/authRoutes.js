const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const { register, login, getMe, logOut, forgetPassword, resetPassword } = require("../controllers/authController");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/forget-password",forgetPassword);
router.post("/reset-password",resetPassword);
router.get("/me", authMiddleware, getMe);


module.exports = router;