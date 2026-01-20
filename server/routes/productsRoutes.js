const express = require("express");
const { storeProducts } = require("../controllers/productsController");
const upload = require("../middlewares/multer");


const router = express.Router();

router.post("/", upload.single("image"), storeProducts);

module.exports = router;