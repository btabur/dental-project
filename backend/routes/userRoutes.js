const express = require("express");
const {createUser, getUserById, getAllUser, updateUser, deleteUser} = require("../controllers/userController");


const router = express.Router();

router.get("/", getUserById);
router.get("/all", getAllUser);

router.post("/create-user", createUser);
router.put("/",updateUser);
router.delete("/",deleteUser)



module.exports = router;