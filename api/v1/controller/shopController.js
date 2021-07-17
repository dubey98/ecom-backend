const User = require("./../models/User");
const Address = require("./../models/Address");
const Lookup = require("./../models/Lookup");
const LookupCategory = require("./../models/LookupCategory");
const { Product, Price, Vendor } = require("./../models/Product");
const Order = require("./../models/Order");
const { validationResult, param } = require("express-validator");

exports.home = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "home",
  });
};

exports.men = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "men",
  });
};

exports.women = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "women",
  });
};

exports.kids = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "kids",
  });
};

exports.homeandliving = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "homeandliving",
  });
};

exports.beauty = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "beauty",
  });
};

exports.products = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;

  Product.find({})
    .skip(offset)
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ success: true, products });
    });
};

exports.product = [
  param("id", "please pass a valid id.").isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const id = req.params.id;

    Product.findById(id)
      .populate("productCategory")
      .populate("price")
      .exec((err, product) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json({
          success: true,
          product,
        });
      });
  },
];

exports.search = (req, res, next) => {
  return res.json({ success: true, category: "search" });
};
