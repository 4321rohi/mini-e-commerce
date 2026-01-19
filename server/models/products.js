const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    required: true
  },
  categories: {
    type: [String]
  },
  image: {
    type: String // image URL
  }

}, { timestamps: true })

const Product = mongoose.model("Product", productsSchema);
module.exports = Product