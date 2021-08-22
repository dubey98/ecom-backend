const User = require("./../models/User");
const Address = require("./../models/Address");
const Lookup = require("./../models/Lookup");
const LookupCategory = require("./../models/LookupCategory");
const { Product, Price, Vendor } = require("./../models/Product");
const Order = require("./../models/Order");
const { validationResult, param } = require("express-validator");
const { mapProductsListDTO } = require("../helpers/helper");
const { MenSubcategory } = require("../constants/Category");

exports.home = (req, res, next) => {
  // men category home page

  const brandCardData = [
    {
      src: "https://bulma.io/images/placeholders/1280x960.png",
      imageAlt: "placeholder Image",
      brandName: "sample brandname",
      helpText: "this is a sample heptext",
    },
    {
      src: "https://bulma.io/images/placeholders/1280x960.png",
      imageAlt: "placeholder Image",
      brandName: "sample brandname",
      helpText: "this is a sample heptext",
    },
    {
      src: "https://bulma.io/images/placeholders/1280x960.png",
      imageAlt: "placeholder Image",
      brandName: "sample brandname",
      helpText: "this is a sample heptext",
    },
    {
      src: "https://bulma.io/images/placeholders/1280x960.png",
      imageAlt: "placeholder Image",
      brandName: "sample brandname",
      helpText: "this is a sample heptext",
    },
    {
      src: "https://bulma.io/images/placeholders/1280x960.png",
      imageAlt: "placeholder Image",
      brandName: "sample brandname",
      helpText: "this is a sample heptext",
    },
  ];

  const imageData = [
    {
      src: "http://localhost:8080/images/index/index2.jpg",
      imageAlt: "group of people walking",
      linksTo: "/shop/",
    },
    {
      src: "http://localhost:8080/images/index/index3.jpg",
      imageAlt: "A Man in a suit",
      linksTo: "/shop/",
    },
  ];

  return res.json({
    success: true,
    category: "home",
    brandCardData: brandCardData,
    imageData: imageData,
  });
};

exports.men = (req, res, next) => {
  const tileOneImages = [
    {
      src: "https://i.ibb.co/pyz317L/men-business-1.jpg",
      alt: "shoes",
      text: "Find Your Look",
      linksTo: "shop/products?category=men&subcategory=shoes",
    },
    {
      src: "https://i.ibb.co/9bgqC4K/men-fashion-landscape.jpg",
      alt: "business attire",
      text: "Explore Business Attire",
      linksTo: "shop/products?category=men&subcategory=shoes",
    },
    {
      src: "https://i.ibb.co/C8P1tR4/levis.jpg",
      alt: "denim",
      text: "Explore Denims",
      linksTo: "shop/products?category=men&subcategory=shoes",
    },
    {
      src: "https://i.ibb.co/CKrbhBV/men-wardrobe.jpg",
      alt: "tshirts",
      text: "Expand your Wardrobe",
      linksTo: "shop/products?category=men&subcategory=shoes",
    },
    {
      src: "https://i.ibb.co/582JfQx/nike.jpg",
      alt: "shoes",
      text: "Explore Footwear",
      linksTo: "shop/products?category=men&subcategory=shoes",
    },
  ];

  const categories = MenSubcategory;

  const brandCardsData = [
    {
      src: "https://i.ibb.co/RB71wM8/brand-1.jpg",
      alt: "NIKE",
      title: "NIKE",
    },
    {
      src: "https://i.ibb.co/bFLx4w8/puma-brand.jpg",
      alt: "PUMA",
      title: "PUMA",
    },
    {
      src: "https://i.ibb.co/C8P1tR4/levis.jpg",
      alt: "NIKE",
      title: "PUMA",
    },
    {
      src: "https://i.ibb.co/582JfQx/nike.jpg",
      alt: "NIKE",
      title: "KIKI",
    },
    {
      src: "https://i.ibb.co/C8P1tR4/levis.jpg",
      alt: "NIKE",
      title: "NIKE",
    },
  ];

  const herodata = {
    src: "https://i.ibb.co/8KBcK32/men-fashion-1.jpg",
    alt: "men fashion ",
  };

  return res.json({
    success: true,
    category: "men",
    tileOneImages: tileOneImages,
    categories: categories,
    brandCardsData: brandCardsData,
    herodata: herodata,
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

  console.log("req data\n", req.query.data);

  Product.find({})
    .populate("price")
    .skip(offset)
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      const retProductList = mapProductsListDTO(products);

      return res.json({ success: true, products: retProductList });
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
  const filtersData = {
    filterCategory: ["Categories", "Brands"],
    filterList: [
      {
        category: "Categories",
        value: "MEN",
        checked: false,
      },
      {
        category: "Categories",
        value: "WOMEN",
        checked: false,
      },
      {
        category: "Categories",
        value: "KIDS",
        checked: false,
      },
      {
        category: "Categories",
        value: "HOME & LIVING",
        checked: false,
      },
      {
        category: "Categories",
        value: "BEAUTY",
        checked: false,
      },
      {
        category: "Brands",
        value: "ADIDAS",
        checked: false,
      },
      {
        category: "Brands",
        value: "NIKE",
        checked: false,
      },
      {
        category: "Brands",
        value: "HERE & NOW",
        checked: false,
      },
      {
        category: "Brands",
        value: "PUMA",
        checked: false,
      },
      {
        category: "Brands",
        value: "PREET",
        checked: false,
      },
    ],
  };

  // men category home page
  res.json({
    success: true,
    data: filtersData,
  });
};
