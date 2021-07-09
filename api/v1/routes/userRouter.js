const express = require("express");

const router = express.Router();

const userController = require("./../controller/userController");

router.get("/", userController.getAll);

router.get("/:id", userController.findById);

router.post("/", userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
