const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");
// get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// get all products with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
        console.log(req.params.id);

    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ msg: "Server error, product cannot be found" });
  }
});

// add new product single
router.post(
  "/addone",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const { name, price, quantity, status, description, imgaddress } = req.body;
    try {
      const newProduct = new Product({
        name,
        price,
        quantity,
        status,
        description,
        imgaddress,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: "Server erro2r" });
    }
  }
);

// add new products many
router.post(
  "/addmany",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    const products = req.body;
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ msg: "Request body must be an array of products" });
    }

    try {
      const savedProducts = [];
      for (const productData of products) {
        const { name, price, quantity, status, description, imgaddress } =
          productData;
        const newProduct = new Product({
          name,
          price,
          quantity,
          status,
          description,
          imgaddress,
        });
        const savedProduct = await newProduct.save();
        savedProducts.push(savedProduct);
      }
      res.status(201).json(savedProducts);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
