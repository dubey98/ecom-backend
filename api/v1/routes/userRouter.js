const express = require("express");

const router = express.Router();

const userController = require("./../controller/userController");

router.get("/address/:id", (req, res, next) => {
  throw new Error("Not Implemented");
});

router.post("/address/:id", (req, res, next) => {
  throw new Error("Not Implemented");
});

router.put("/address/:id", (req, res, next) => {
  throw new Error("Not Implemented");
});

router.delete("/address/:id", (req, res, next) => {
  throw new Error("Not Implemented");
});

router.get("/", userController.getAll);

router.get("/:id", userController.findById);

router.post("/", userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
