const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

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

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: tokenExpires,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  //! ürün ortamında true YAP
    sameSite: "Strict",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 30 gün veya 1 saat
  });

  res.status(200).json({ message: "Giriş başarılı.", token: token });
};

exports.logOut = async (req,res)=> {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Çıkış yapıldı." });
}

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Lütfen bir email girin" });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).send({ message: "Kullanıcı bulunamadı" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL, // Gönderen adresi env'den al
      to: email,
      subject: "Şifre sıfırlama",
      text: `Yeni bir şifre oluşturmak için bu linki tıkla: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({ message: "Sıfırlama maili gönderildi" });
  } catch (error) {
    console.error("Şifre sıfırlama hatası:", error);
    return res.status(500).send({ message: "Sunucu hatası, lütfen tekrar deneyin" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query; // URL'den token al
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Bir şifre girmelisiniz" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send({ message: "Kullanıcı bulunamadı" });
    }

    // Şifreyi hash'le ve güncelle
    user.password = password
    await user.save();

    // Kullanıcıyı güncelledikten sonra, giriş yapabilmesi için bir token oluştur
    const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Kullanıcıya yeni token'ı döndür
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,  //! ürün ortamında true YAP
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 saat
    });

    return res.status(200).send({ message: "Şifre başarıyla güncellendi" });
  } catch (error) {
    return res.status(500).send({ message: "Sunucu hatası, tekrar deneyin" });
  }
};



