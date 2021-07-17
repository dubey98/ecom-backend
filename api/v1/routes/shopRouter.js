const express = require("express");
const homeController = require("./../controller/shopController");

const router = express.Router();

router.get("/men", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/women", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/kids", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/homeandliving", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/beauty", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/search", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/products", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/:id", (req, res, next) => {
  return res.json("Not IMplemented");
});

router.get("/", (req, res, next) => {
  const id = req.params.id;

  res.json({ success: true, params: id });
});

module.exports = router;
