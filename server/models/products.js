const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,// image URL
    required: true
  }

}, { timestamps: true })

const Product = mongoose.model("Product", productsSchema);
module.exports = Product