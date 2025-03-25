const mongoose = require("mongoose");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const { Types } = mongoose;

// ✅ User Ekleme
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: "Bu email kullanılmaktadır" });
        }
        const existName = await User.findOne({ name });
        if (existName) {
            return res.status(400).json({ error: "Bu isimde bir kullanıcı bulunmaktadır" });
        }
        const user = await User.create({ name, email, password, phone, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Bir hata oluştu", details: error.message });
    }
};

const getAllUser = async (req,res)=> {
    try {
    const users = await User.find({role:"user"})

    if(!users) {
        return res.status(400).json({ error: "Kayıtlı kullanıcı bulunamadı" });
    }

    res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Bir hata oluştu", details: error.message });
    }

   

}

const getUserById = async (req,res)=> {
    try {
         const {id} = req.query;
      if (!id) {
        return res.status(400).json({ message: "id required" });
      }
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid userId" });
      }
      // Kullanıcıyı bul
      const user = await User.findById(new Types.ObjectId(id.toString()));
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }

      const appointment = await Appointment.find({patient:user._id})
     
          res.status(200).json({ user, appointment });    
      
  
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

const updateUser = async (req,res)=> {
    try {
        const { id, name, phone,email } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id required" });
          }
          if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid userId" });
          }

        const user = await User.findById(new Types.ObjectId(id.toString()))
        if(!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        // Güncelleme verilerini hazırla
    const updateData = {};
    if (name) updateData.name = name;
    if (email) {
        const exist = await User.findOne({email})
        if(exist) {
            return res.status(404).json({ message: "Bu mail kullanılmaktadır" });
        }
        updateData.email = email;
    }

    if (phone) updateData.phone = phone;

    // Kullanıcıyı güncelle
    const updatedPersonel = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateData,
      { new: true }
    );

    // Kullanıcı bulunamazsa veya güncellenmezse
    if (!updatedPersonel) {
      return res
        .status(400)
        .json({ message: "Kullanıcı güncellenemedi" });
    }

    // Başarılı yanıt
    return res
      .status(200)
      .json({
        message: "Bigiler başarı ile güncellendi",
        user: updatedPersonel,
      });
        
    } catch (error) {
        
    }
}

// ✅ KUllanıcı Silme
const deleteUser = async (req, res) => {
    try {
      const { id } = req.query;
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }
  
      res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





module.exports = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser
};