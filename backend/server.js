const express = require("express");
require("dotenv").config();
const cors = require("cors")
const connectDB = require("./config/db");
const mainRoute = require("./routes/index.js")
const http = require("http");
const {Server}= require("socket.io")
const cookieParser =require("cookie-parser") ;
const bcrypt = require("bcrypt");
const User = require("./models/User.js");


// MongoDB'ye bağlan
connectDB();
const app = express();

//middlewares


app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
// CORS'u aktif et
// CORS middleware'i ekle
app.use(
    cors({
      origin: "http://localhost:3000", // Frontend adresi
      credentials: true, // Cookies ve authentication için gerekli
    })
  );

app.use("/api",mainRoute)

const server = http.createServer(app);
// const io = socketIo(server);
const io = new Server( server,{
    cors:{
        origin:"*"
    }
})
// `io` nesnesini tüm uygulamada erişilebilir hale getir
app.set("io", io);


// Uygulama açıldığında admin kullanıcısını kontrol et ve ekle
const createDefaultAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });
  if (!adminExists) {

      const newAdmin = new User({
          name:"Balı Tabur",
          phone:"05555 5555 55",
          email: process.env.DEVELOPER_EMAIL,
          password: process.env.DEVELOPER_PASSWORD,
          role:"admin"
      });
      await newAdmin.save();
      console.log("Varsayılan admin kullanıcısı eklendi.");
  }
};

createDefaultAdmin(); // Fonksiyonu çağır


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));