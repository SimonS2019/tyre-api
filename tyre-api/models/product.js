const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // This is the name of the product
  price: { type: Number, required: true }, // This is the price of the product
  quantity: { type: Number, required: true }, // This is the quantity of the product in stock
  description: { type: String, required: true }, // This is the description of the product
  img: { type: Buffer, required: true }, // This is the image file data of the product
  imgType: { type: String, required: true }, // MIME type (e.g., 'image/jpeg')
  overview: { type: String, required: true }, // Detailed overview (about 100 words)
  specifications: { type: String, required: true }, // Product specifications as a string
  performance_and_warranty: { type: String, required: true }, // Performance and warranty details as a string
});

module.exports = mongoose.model("Product", ProductSchema);
