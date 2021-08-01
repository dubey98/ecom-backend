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
  console.log(req.query);

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
    const data = {
      images: [
        "http://localhost:8080/images/detail/m1.webp",
        "http://localhost:8080/images/detail/m2.webp",
        "http://localhost:8080/images/detail/m3.jpg",
        "http://localhost:8080/images/detail/m4.webp",
      ],
      brandName: "BrandName",
      brandDescription: "A little Description about the brand",
      price: 4500,
      mrpPrice: 9000,
      discount: "20%",
      summary: "Maroon solid T-shirt, has a round neck, short sleeves",
      sizeFitDescription: "The model (height 6') is wearing a size M",
      materialandcare: ["Cotton", "Rayon", "Machine wash"],
    };
    return res.json({ success: true, data });

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

exports.filters = (req, res, next) => {
  const filtersData = [
    {
      title: "CATEGORIES",
      filters: ["men", "women", "kids", "Home & Living", "Beauty"],
    },
    {
      title: "Brands",
      filters: ["adidas", "nike", "myntra", "amazon", "flipkart"],
    },
  ];

  // men category home page
  res.json({
    success: true,
    data: filtersData,
  });
};
