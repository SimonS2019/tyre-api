const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // 产品 ID
  name: { type: String, required: true },              // 产品名称
  price: { type: Number, required: true },             // 产品价格
  quantity: { type: Number, required: true },          // 产品数量
  status: { type: String, required: true },            // 库存状态
  description: { type: String, required: true },       // 产品描述
  imgaddress: { type: String, required: true },        // 图片地址
});

module.exports = mongoose.model('Product', ProductSchema);
