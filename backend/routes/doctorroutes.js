const express = require("express");
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router.post("/create", createDoctor);
router.get("/all", getAllDoctors);
router.get("/one", getDoctorById);
router.put("/update", updateDoctor);
router.delete("/delete", deleteDoctor);

module.exports = router;
