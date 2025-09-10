const mongoose = require("mongoose");
const User = require("./User");

const doctorSchema = new mongoose.Schema({
  unWorkDays: [{
  date: Date,
  reason: String // örn: "Yıllık izin", "Kongre", "Hastalık"
}],

 availableSchedule: [{
  day: { type: String, enum: ["Pazartesi", "Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"] },
  startHour: String, // "09:00"
  endHour: String,   // "17:00"
}]

});

const Doctor = User.discriminator("Doctor", doctorSchema);
module.exports = Doctor;
