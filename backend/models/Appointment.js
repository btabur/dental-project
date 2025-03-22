const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  treatmentType: { type: String},
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
