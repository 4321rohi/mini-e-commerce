const express = require("express");
const { storeProducts } = require("../controllers/productsController");
const upload = require("../middlewares/multer");
const { fetchProducts } = require("../controllers/fetchProductsController");


const router = express.Router();

router.get("/", fetchProducts)
router.post("/", upload.single("image"), storeProducts);

module.exports = router;