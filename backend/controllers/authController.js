const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")

dotenv.config();


exports.register = async (req, res) => {
  const { name, email, password,phone} = req.body;
  const user = await User.create({ name, email, password,phone });
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Kullanıcı bulunamadı." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Hatalı şifre." });
  }

  // "Beni Hatırla" seçildiyse token süresi uzun olur
  const tokenExpires = rememberMe ? "1m" : "1h";

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: tokenExpires,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  //! ürün ortamında true YAP
    sameSite: "Strict",
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 gün veya 1 saat
  });

  res.status(200).json({ message: "Giriş başarılı.",token:token });
};

exports.logOut = async (req,res)=> {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Çıkış yapıldı." });
}

