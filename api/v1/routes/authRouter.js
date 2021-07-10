const express = require("express");
const { body, oneOf } = require("express-validator");

const router = express.Router();

const authController = require("./../controller/authController");

router.post(
  "/signup",
  body("username").isString(),
  body("password").isString(),
  body("confirmPassword").isString(),
  authController.signup
);

router.post(
  "/login",
  body("username").isString(),
  body("password").isString(),
  authController.login
);

module.exports = router;
