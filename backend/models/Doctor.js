const mongoose = require("mongoose");
const User = require("./User");

const doctorSchema = new mongoose.Schema({
   unWorkDays: [{
     _id: false,
    startDate: Date,
    endDate: Date,
    reason: String
  }],

  unWorkHours: [{
     _id: false,
    date: Date,
    startHour: String,
    endHour: String,
    reason: String
  }],

 availableSchedule: [{
   _id: false,
  day: { type: String, enum: ["Pazartesi", "Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"] },
  startHour: String, // "09:00"
  endHour: String,   // "17:00"
}],
profileImage: { type: String },

});

const Doctor = User.discriminator("Doctor", doctorSchema);
module.exports = Doctor;
