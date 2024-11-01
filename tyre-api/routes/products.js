const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();

    // Convert each product's image buffer to Base64 and include MIME type
    const productsWithBase64Images = products.map((product) => ({
      ...product.toObject(),
      img: product.img ? product.img.toString("base64") : null, // Convert to Base64
      imgType: product.imgType || "image/jpeg", // Default MIME type if not provided
    }));

    res.json(productsWithBase64Images);
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

    // Convert the image buffer to Base64 and include MIME type
    const productWithBase64Image = {
      ...product.toObject(),
      img: product.img ? product.img.toString("base64") : null,
      imgType: product.imgType || "image/jpeg", // Default MIME type if not provided
    };

    res.json(productWithBase64Image);
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
  upload.single("img"),
  async (req, res) => {
    const { name, price, quantity, description, overview, specifications, performance_and_warranty } = req.body;
    const img = req.file.buffer; // Get the image file buffer
    const imgType = req.file.mimetype; // Get the MIME type of the image

    try {
      const newProduct = new Product({
        name,
        price,
        quantity,
        description,
        img,
        imgType, // Store MIME type
        overview,
        specifications,
        performance_and_warranty,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// update product by id
router.put(
  "/:id",
  authenticateJWT,
  authorizeRole("admin"),
  upload.single("img"),
  async (req, res) => {
    const { name, price, quantity, description, overview, specifications, performance_and_warranty } = req.body;
    const img = req.file ? req.file.buffer : undefined; // Get the image file buffer if provided
    const imgType = req.file ? req.file.mimetype : undefined; // Get the MIME type of the image if provided

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          quantity,
          description,
          overview,
          specifications,
          performance_and_warranty,
          ...(img && { img }), // Only update img if provided
          ...(imgType && { imgType }), // Only update imgType if provided
        },
        { new: true }
      );

      if (!updatedProduct) return res.status(404).json({ msg: "Product not found" });

      res.json(updatedProduct);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: "Server error, product cannot be updated" });
    }
  }
);

// delete product by id
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.json({ msg: "Product deleted successfully" });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: "Server error, product cannot be deleted" });
    }
  }
);

module.exports = router;
