const express = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const authenticateJWT = require("../middlewares/authMiddleware"); // Adjust the path as necessary
const router = express.Router();

// Create a new order
router.post("/", authenticateJWT, async (req, res) => {
  const { orderId, products, contactDetails, shippingPrice } = req.body;
  const userId = req.user.userId; // Extract userId from authenticated user

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
    // Add shipping price to total price
    totalPrice += shippingPrice;
    // Create a new order
    const order = new Order({
      orderId,
      userId,
      products: productDetails,
      totalPrice,
      contactDetails, // Include contact details
      shippingPrice,
    });

    // Save the order to the database
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
