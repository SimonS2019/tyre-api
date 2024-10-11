const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // This is the unique identifier for the product
  name: { type: String, required: true },             // This is the name of the product
  price: { type: Number, required: true },            // This is the price of the product
  quantity: { type: Number, required: true },         // This is the quantity of the product in stock
  status: { type: String, required: true },           // This is the status of the product (e.g., available, out of stock)
  description: { type: String, required: true },      // This is the description of the product
  imgaddress: { type: String, required: true },       // This is the URL address of the product image
});

module.exports = mongoose.model('Product', ProductSchema);