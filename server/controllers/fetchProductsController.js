// const Product = require('../models/product.model'); // adjust path if needed

const Product = require("../models/products");

const fetchProducts = async (req, res) => {
  try {
    // 1️⃣ Read query params
    const { search, category, sort, page, limit } = req.query;

    // 2️⃣ Defaults
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 6;

    // 3️⃣ Build filter
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    // 4️⃣ Sorting
    let sortOption = {};

    if (sort === 'price_asc') {
      sortOption.price = 1;
    } else if (sort === 'price_desc') {
      sortOption.price = -1;
    } else {
      sortOption.createdAt = -1; // default
    }

    // 5️⃣ Pagination
    const skip = (pageNumber - 1) * pageSize;

    // 6️⃣ Fetch data
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments(filter);

    // 7️⃣ Response
    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: pageSize,
      totalItems: totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

module.exports = { fetchProducts };
