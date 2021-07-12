const express = require("express");

const router = express.Router();

const lookupCategoryController = require("../controller/lookupCategoryController");

router.get("/count", lookupCategoryController.count);

router.get("/", lookupCategoryController.getAll);

router.get("/:id", lookupCategoryController.getOne);

router.post("/", lookupCategoryController.create);

router.delete("/", lookupCategoryController.deleteAll);

router.delete("/:id", lookupCategoryController.delete);

router.put("/:id", lookupCategoryController.update);

module.exports = router;
