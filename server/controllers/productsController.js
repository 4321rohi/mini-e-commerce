const imagekit = require("../middlewares/imageKit");
const Product = require("../models/products");

const storeProducts = async (req, res) => {
  try {

    const { name, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }


    // const image = req.file ? req.file.path : null;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "products"
    });

    const parsedPrice = Number(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const product = new Product({ name: name, price: parsedPrice, category: category, image: result.url });
    // image: `/uploads/${req.file.filename}`
    await product.save();
    return res.status(201).json({ message: "Product Succesfully added", product })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { storeProducts }