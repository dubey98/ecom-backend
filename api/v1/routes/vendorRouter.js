const router = require("express").Router();

const vendorController = require("./../controller/vendorController");

// posts
router.post("/product", vendorController.createProduct);

module.exports = router;
