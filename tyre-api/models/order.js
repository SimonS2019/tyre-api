const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
  shippingPrice: { type: Number, required: true }, // Shipping price
  totalPrice: { type: Number, required: true }, // Total price
  orderDate: { type: Date, default: Date.now }, // Order date
  contactDetails: {
    name: { type: String, required: true }, // Contact name
    phone: { type: String, required: true }, // Contact phone number
    email: { type: String, required: true }, // Contact email address
    address: { type: String, required: true }, // Contact address
  }, // Contact details
});

module.exports = mongoose.model("Order", OrderSchema);
