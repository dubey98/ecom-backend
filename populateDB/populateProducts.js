const faker = require("faker");

const { Product, Price } = require("./../api/v1/models/Product");
const {
  BeautySubcategory,
  brands,
  homeAndLivingSubcategory,
  KidsSubcategory,
  MenSubcategory,
  WomenSubcategory,
} = require("../api/v1/constants/Category");
const {
  beautyList,
  HomeImg,
  kidsList,
  menList,
  womenList,
} = require("../api/v1/constants/ImageSrc");

function start() {
  let names = [
    "HRX by Hrithik Roshan",
    "Calvin Klein Jeans",
    "HERE&NOW",
    "Moda Rapido",
    "Wrangler",
    "Wrogn",
    "Louis Phillipe Sport",
    "Moda Rapido",
    "Difference",
    "what!!",
    "ThisIsNew",
    "Calvin klien",
    "HRX clothes",
  ];
  const menSubCategory = Object.keys(MenSubcategory);
  for (let i = 0; i < 50; i++) {
    const p = Math.floor(Math.random() * 10000);
    const price = new Price({
      vendorPrice: p - p / 10,
      offerPrice: p,
      currency: "INR",
      mrp: p + Math.floor(Math.random() * 1000),
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: [menList[Math.floor(Math.random() * menList.length)]],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
      category: "men",
      subCategory:
        menSubCategory[Math.floor(Math.random() * menSubCategory.length)],
    });

    product.save();
  }

  names = [
    "Athena",
    "miss chase",
    "doda & moa",
    "SASA FRAYS",
    "mark louis",
    "min4nine",
    "rare",
    "vara moda",
    "vnm",
    "tokyo talkies",
    "the pink moon",
    "mast & harbour",
    "fab alley",
  ];
  const womenSubCategory = Object.keys(WomenSubcategory);
  for (let i = 0; i < 30; i++) {
    const p = Math.floor(Math.random() * 10000);
    const price = new Price({
      vendorPrice: p - p / 10,
      offerPrice: p,
      currency: "INR",
      mrp: p + Math.floor(Math.random() * 1000),
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: [womenList[Math.floor(Math.random() * womenList.length)]],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
      category: "women",
      subCategory:
        womenSubCategory[Math.floor(Math.random() * womenSubCategory.length)],
    });

    product.save();
  }
  names = ["man zone", "shop kins", "baby go", "baby care kids", "poo chi poo"];
  const kids = Object.keys(KidsSubcategory);
  for (let i = 0; i < 20; i++) {
    const p = Math.floor(Math.random() * 10000);
    const price = new Price({
      vendorPrice: p - p / 10,
      offerPrice: p,
      currency: "INR",
      mrp: p + Math.floor(Math.random() * 1000),
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: [kidsList[Math.floor(Math.random() * kidsList.length)]],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
      category: "kids",
      subCategory: kids[Math.floor(Math.random() * kids.length)],
    });

    product.save();
  }

  names = [
    "map powder kiss lipsticks",
    "milani amore matt lip cream",
    "renee",
    "maybeline liquid foundation",
    "wet and wild compact powder",
    "lakme invisible",
  ];
  const beauty = Object.keys(BeautySubcategory);
  for (let i = 0; i < 20; i++) {
    const p = Math.floor(Math.random() * 10000);
    const price = new Price({
      vendorPrice: p - p / 10,
      offerPrice: p,
      currency: "INR",
      mrp: p + Math.floor(Math.random() * 1000),
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: beautyList[[Math.floor(Math.random() * beautyList.length)]],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
      category: "beauty",
      subCategory: beauty[Math.floor(Math.random() * beauty.length)],
    });

    product.save();
  }

  names = [
    "home center",
    "fab india",
    "home sake",
    "green girgit",
    "craft vakita",
    "costa homes",
  ];
  const home = Object.keys(homeAndLivingSubcategory);
  for (let i = 0; i < 20; i++) {
    const p = Math.floor(Math.random() * 10000);
    const price = new Price({
      vendorPrice: p - p / 10,
      offerPrice: p,
      currency: "INR",
      mrp: p + Math.floor(Math.random() * 1000),
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: HomeImg[[Math.floor(Math.random() * HomeImg.length)]],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
      category: "homeandliving",
      subCategory: home[Math.floor(Math.random() * home.length)],
    });

    product.save();
  }
}

module.exports = {
  start,
};
