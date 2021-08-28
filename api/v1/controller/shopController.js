const User = require("./../models/User");
const Address = require("./../models/Address");
const Lookup = require("./../models/Lookup");
const LookupCategory = require("./../models/LookupCategory");
const { Product, Price, Vendor } = require("./../models/Product");
const Order = require("./../models/Order");
const { validationResult, param } = require("express-validator");
const { mapProductsListDTO, mapProductToDTO } = require("../helpers/helper");
const {
  MenSubcategory,
  filterCategory,
  category,
  brands,
  WomenSubcategory,
  KidsSubcategory,
  homeAndLivingSubcategory,
  BeautySubcategory,
} = require("../constants/Category");
const {
  brandImg,
  brandCardData,
  menHeroData,
  tileOneImageList,
  HomePageCards,
  detailImg,
  tileOneImageWomen,
  tileOneImageKids,
} = require("../constants/ImageSrc");

exports.home = (req, res, next) => {
  // men category home page

  const brandCardData = HomePageCards;

  const imageData = [
    {
      src: "https://i.ibb.co/vcJWdcq/index2.jpg",
      imageAlt: "group of people walking",
      linksTo: "/shop/products?0%5Bcategory%5D=brand&0%5Bvalue%5D=Adidas",
    },
    {
      src: "https://i.ibb.co/g6gtXth/index3.jpg",
      imageAlt: "A Man in a suit",
      linksTo: "/shop/products?0%5Bcategory%5D=brand&0%5Bvalue%5D=Adidas",
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
  const tileOneImages = tileOneImageList;

  const categories = MenSubcategory;

  const brandCardsData = brandCardData;

  const herodata = menHeroData;

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
  const heroData = {
    src: "https://i.ibb.co/mHJxtsF/photo-1603122630570-7fd434d470d0-ixlib-rb-1-2.jpg",
    alt: "women fashion ",
  };

  // men category home page
  res.json({
    success: true,
    category: "women",
    categories: WomenSubcategory,
    tileOneImages: tileOneImageWomen,
    brandCardsData: brandCardData,
    herodata: heroData,
  });
};

exports.kids = (req, res, next) => {
  const heroData = {
    src: "https://i.ibb.co/BGp1rQ7/photo-1531325082793-ca7c9db6a4c1-ixid-Mnwx-Mj-A3f-DB8-MHxwa-G90by1w-YWdlf-Hx8f-GVuf-DB8f-Hx8-ixlib-r.jpg",
    alt: "women fashion ",
  };

  // men category home page
  res.json({
    success: true,
    category: "kids",
    categories: KidsSubcategory,
    tileOneImages: tileOneImageKids,
    brandCardsData: brandCardData,
    herodata: heroData,
  });
};

exports.homeandliving = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "homeandliving",
    categories: homeAndLivingSubcategory,
    tileOneImages: tileOneImageList,
    brandCardsData: brandCardData,
    herodata: menHeroData,
  });
};

exports.beauty = (req, res, next) => {
  // men category home page
  res.json({
    success: true,
    category: "beauty",
    categories: BeautySubcategory,
    tileOneImages: tileOneImageList,
    brandCardsData: brandCardData,
    herodata: menHeroData,
  });
};

// /shop/products?filters
exports.products = (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset) || 0;
    console.log(limit);

    if (req.query.filters && Array.isArray(req.query.filters)) {
      let categoryFilters = req.query.filters
        .filter((filter) => {
          return filter.category.toUpperCase() === "categories".toUpperCase();
        })
        .map((filter) => {
          return {
            category: filter.value.trim().toLowerCase(),
          };
        });
      let brandFilters = req.query.filters
        .filter((filter) => {
          return filter.category.toUpperCase() === "brand".toUpperCase();
        })
        .map((filter) => {
          return {
            brand: { $regex: new RegExp(filter.value.toLowerCase(), "i") },
          };
        });
      let queryArray = [...categoryFilters, ...brandFilters];
      Product.find({ $or: queryArray })
        .populate("price")
        .skip(offset)
        .limit(limit)
        .exec((err, products) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          const retProductList = mapProductsListDTO(products);
          Product.countDocuments({ $or: queryArray }, (err, count) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            return res.json({
              success: true,
              products: retProductList,
              totalCount: count,
            });
          });
        });
    } else {
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
          console.log(retProductList.length);
          Product.countDocuments((err, count) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            return res.json({
              success: true,
              products: retProductList,
              totalCount: count,
            });
          });
        });
    }
  } catch (ex) {
    console.log(ex);
    return next(ex);
  }
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
      .populate("price")
      .exec((err, product) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        const retProduct = mapProductToDTO(product);

        return res.json({
          success: true,
          product: retProduct,
        });
      });
  },
];

exports.search = (req, res, next) => {
  return res.json({ success: true, category: "search" });
};

exports.filters = (req, res, next) => {
  const tempFilterList = [];

  for (let [key, value] of Object.entries(category)) {
    tempFilterList.push({
      category: "categories",
      value: key,
      display: value,
      checked: false,
    });
  }

  for (let brand of brands) {
    tempFilterList.push({
      category: "brand",
      value: brand,
      display: brand,
      checked: false,
    });
  }

  const filtersData = {
    filterCategories: [...filterCategory],
    filterList: tempFilterList,
  };

  // men category home page
  res.json({
    success: true,
    data: filtersData,
  });
};
