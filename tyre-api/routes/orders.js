const express = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const authenticateJWT = require("../middlewares/authMiddleware"); // Adjust the path as necessary
const router = express.Router();

// Create a new order
router.post("/", authenticateJWT, async (req, res) => {
  const { orderId, userId, products, contactDetails } = req.body;
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

    // Create a new order
    const order = new Order({
      orderId,
      userId,
      products: productDetails,
      totalPrice,
      contactDetails, // Include contact details
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
    const orders = await Order.find({ userId: req.user.userId })
      .populate("userId")
      .populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
