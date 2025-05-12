const mongoose = require("mongoose");
const Appointment = require("../models/Appointment.js");
const { Types } = mongoose;

// ✅ randevu Ekleme
const createAppointment = async (req, res) => {
    try {
      const { patientId, doctorId,treatmentType,date,time,notes,status } = req.body;
  
      // Aynı hastanın onaylanmamış bir randevusu var mı
      const isOpen = await Appointment.exists({
        patientId,
        status: "unapproved",
      });
  
      if (isOpen) {
        return res
          .status(400)
          .json({
            error: "Onay bekleyen bir randevunuz zaten bulunmaktadır",
          });
      }
  
      // Yeni randevu oluştur
      const appointment = new Appointment({ patientId, doctorId,treatmentType,date,time,notes,status });
      await appointment.save();
      
      // Yeni randevu eklendiğini frontend'e bildir
      req.app.get("io").emit(`addedNewApporve`, appointment);
  
      // _id'yi de içeren soru nesnesini döndür
      res.status(201).json({
        ...appointment.toObject(),
        _id: appointment._id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  

  module.exports = {
    createAppointment,
  };