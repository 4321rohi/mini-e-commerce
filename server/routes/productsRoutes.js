const express = require("express");
const { storeProducts } = require("../controllers/productsController");


const router = express.Router();

router.get("/", storeProducts);

module.exports = router;