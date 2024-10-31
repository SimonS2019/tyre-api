const mongoose = require('mongoose');

const TireSchema = new mongoose.Schema({
  type: { type: String, required: true },               // This is the type of the tire
  description: { type: String, required: true },        // This is the description of the tire
  long_description: { type: String, required: true },   // This is the long description of the tire
  image_name: { type: String, required: true },         // This is the name of the tire image
});

module.exports = mongoose.model('Tiretype', TireSchema);