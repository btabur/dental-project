const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  treatmentType: { type: String},
  date: { type: String, required: true },
  time: { type: [String], required: true },
  notes: {type:String},
  status: { type: String, enum: ['unapproved',"approved"], default: 'unapproved' }, 
});

module.exports = mongoose.model("Appointment", appointmentSchema);
