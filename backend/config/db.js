const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI bulunamadı! .env dosyanızı kontrol edin.");
    }

    await mongoose.connect(mongoUri); 

    console.log("✅ MongoDB bağlantısı başarılı!");
  } catch (error) {
    console.error("❌ MongoDB bağlantı hatası:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;