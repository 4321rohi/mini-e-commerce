const Product = require("../models/products");

const storeProducts = async (req, res) => {
  try {

    const { name, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = req.file ? req.file.filename : null;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedPrice = Number(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const product = new Product({ name: name, price: parsedPrice, category: category, image: image });
    await product.save();
    return res.status(201).json({ message: "Product Succesfully added", product })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { storeProducts }