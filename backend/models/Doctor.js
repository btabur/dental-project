const mongoose = require("mongoose");
const User = require("./User");

const doctorSchema = new mongoose.Schema({
  specialization: { type: String },
  availableDays: { type: [String], default: [] }, // örn: ["Monday", "Wednesday"]
  availableHours: { type: [String], default: [] }, // örn: ["09:00", "13:00"]
  dayOffs: { type: [String], default: [] }, // örn: ["2025-05-15", "2025-05-20"]
});

const Doctor = User.discriminator("Doctor", doctorSchema);
module.exports = Doctor;
