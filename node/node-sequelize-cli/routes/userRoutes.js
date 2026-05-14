const { Router } = require("express");
const UserController = require("../controllers/userController.js");

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.get("/:userId/products", UserController.getAllProducts);

module.exports = router;