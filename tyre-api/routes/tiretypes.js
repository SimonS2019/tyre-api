const express = require("express");
const router = express.Router();
const Tiretype = require("../models/tiretype"); // Adjust the path as necessary

// Route to get all tire types
router.get("/", async (req, res) => {
  try {
    const tiretypes = await Tiretype.find();
    res.json(tiretypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Route to create a new tire type
// router.post('/', async (req, res) => {
//   const tiretype = new Tiretype({
//     type: req.body.type,
//     description: req.body.description,
//     long_description: req.body.long_description,
//     image_name: req.body.image_name,
//   });

//   try {
//     const newTiretype = await tiretype.save();
//     res.status(201).json(newTiretype);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// add a list of tire types
router.post("/addmany", async (req, res) => {
  const tiretypes = req.body;
  if (!Array.isArray(tiretypes)) {
    return res
      .status(400)
      .json({ msg: "Request body must be an array of tire types" });
  }

  try {
    const savedTiretypes = [];
    for (const tiretypeData of tiretypes) {
      const { type, description, long_description, image_name } = tiretypeData;
      const newTiretype = new Tiretype({
        type,
        description,
        long_description,
        image_name,
      });
      const savedTiretype = await newTiretype.save();
      savedTiretypes.push(savedTiretype);
    }
    res.status(201).json(savedTiretypes);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
