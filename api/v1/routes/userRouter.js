const express = require("express");

const router = express.Router();

const userController = require("./../controller/userController");

router.get("/address/", userController.getAllAddresses);

router.get("/address/:id", userController.getOneAddress);

router.post("/address/", userController.createAddress);

router.put("/address/:id", userController.updateAddress);

router.delete("/address/:id", userController.deleteAddress);

router.get("/getcart", userController.getCart);

router.post("/addtocart/", userController.addToCart);

router.post("/removefromcart", userController.removeFromCart);

router.post("/favourite", userController.addToFav);

router.get("/favourite/:id", userController.getFav);

router.get("/favourite/check/:id", userController.checkIfFav);

router.get("/", userController.getAll);

router.get("/:id", userController.findById);

router.post("/", userController.createOne);

router.put("/:id", userController.updateOne);

router.delete("/:id", userController.deleteOne);

module.exports = router;
