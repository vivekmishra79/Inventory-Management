const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  casNumber: { type: String, required: true, unique: true },
  unit: { type: String, enum: ["KG", "MT", "Litre"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
