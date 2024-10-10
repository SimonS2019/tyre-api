const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// 获取所有产品
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 获取单个产品
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// 添加新产品
router.post('/', async (req, res) => {
    const { id, name, price, quantity, status, description, imgaddress } = req.body;
    try {
      const newProduct = new Product({ id, name, price, quantity, status, description, imgaddress });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router;
