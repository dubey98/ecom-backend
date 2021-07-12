const express = require("express");

const router = express.Router();

const lookupController = require("../controller/lookupController");

router.get("/", lookupController.getAll);

router.get("/:id", lookupController.getOne);

router.post("/:id?", lookupController.create);

router.delete("/", lookupController.deleteAll);

router.delete("/:id", lookupController.delete);

router.put("/:id", lookupController.update);

module.exports = router;
