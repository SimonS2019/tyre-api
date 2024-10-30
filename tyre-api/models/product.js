const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },             // This is the name of the product
  price: { type: Number, required: true },            // This is the price of the product
  quantity: { type: Number, required: true },         // This is the quantity of the product in stock
  description: { type: String, required: true },      // This is the description of the product
  img: { type: Buffer, required: true },              // This is the image file data of the product
});

module.exports = mongoose.model('Product', ProductSchema);