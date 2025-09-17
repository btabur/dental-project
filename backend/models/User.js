const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const options = { discriminatorKey: "role", timestamps: true };

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ["patient", "doctor","nurse","account", "admin"] },
  password: { type: String, required: true },
  type: { type: String, enum:["public","private"], default:"public" },
}, options);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
