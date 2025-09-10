const Doctor = require("../models/Doctor");

// ✅ Create new doctor
const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, password, unWorkDays, availableSchedule } = req.body;

    const doctor = new Doctor({
      name,
      email,
      phone,
      password,
      unWorkDays,
      availableSchedule
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.query.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update doctor
const updateDoctor = async (req, res) => {
  try {
    const { name, email, phone, password, unWorkDays, availableSchedule } = req.body;

    const doctor = await Doctor.findById(req.query.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // alanları güncelle
    if (name) doctor.name = name;
    if (email) doctor.email = email;
    if (phone) doctor.phone = phone;
    if (password) doctor.password = password; // pre-save hook sayesinde hashlenecek
    if (unWorkDays) doctor.unWorkDays = unWorkDays;
    if (availableSchedule) doctor.availableSchedule = availableSchedule;

    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.query.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
