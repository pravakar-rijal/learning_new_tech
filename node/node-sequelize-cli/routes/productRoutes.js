const { Router } = require("express");
const ProductController = require("../controllers/productController");

const router = Router();

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.createProduct);

module.exports = router;