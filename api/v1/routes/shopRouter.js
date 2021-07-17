const express = require("express");
const shopController = require("./../controller/shopController");

const router = express.Router();

router.get("/", shopController.home);

router.get("/men", shopController.men);

router.get("/women", shopController.women);

router.get("/kids", shopController.kids);

router.get("/homeandliving", shopController.homeandliving);

router.get("/beauty", shopController.beauty);

router.get("/search", shopController.search);

router.get("/products", shopController.products);

router.get("/:id", shopController.product);

module.exports = router;
