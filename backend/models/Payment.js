const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amountPaid: [
    {
      amount: { type: Number, required: true },
      type: { type: String, enum: ["cash", "credit"], required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  totalAmount: { type: Number, required: true }, // Toplam ödenecek tutar
  amountRemaining: { type: Number, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
