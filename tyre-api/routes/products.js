const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// 获取所有产品
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 获取单个产品
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// add new product single
router.post("/addone", async (req, res) => {
  const { id, name, price, quantity, status, description, imgaddress } =
    req.body;
  try {
    const newProduct = new Product({
      id,
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
});

// add new products many
router.post("/addmany", async (req, res) => {
  const products = req.body;
  if (!Array.isArray(products)) {
    return res
      .status(400)
      .json({ msg: "Request body must be an array of products" });
  }

  try {
    const savedProducts = [];
    for (const productData of products) {
      const { id, name, price, quantity, status, description, imgaddress } =
        productData;
      const newProduct = new Product({
        id,
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
});

module.exports = router;
