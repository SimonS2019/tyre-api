const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true }, // Order ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Product ID
      quantity: { type: Number, required: true }, // Quantity of the product
      subtotal: { type: Number, required: true }, // Subtotal price for the product
    },
  ],
  totalPrice: { type: Number, required: true }, // Total price
  status: { type: String, default: "Pending" }, // Order status
  orderDate: { type: Date, default: Date.now }, // Order date
});

module.exports = mongoose.model("Order", OrderSchema);
