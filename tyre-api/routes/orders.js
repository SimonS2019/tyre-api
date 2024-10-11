const express = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  const { orderId, userId, products } = req.body;
  try {
    let totalPrice = 0;

    // Iterate over each product, calculate subtotal and total price
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");

        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;

        return {
          productId: item.productId,
          quantity: item.quantity,
          subtotal: subtotal,
        };
      })
    );

    const newOrder = new Order({
      orderId,
      userId,
      products: productDetails,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
