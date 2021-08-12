const faker = require("faker");

const { Product, Price } = require("./../api/v1/models/Product");
const { Productcategory } = require("./../api/v1/models/ProductCategory");

const brands = [
  "Adidas",
  "Puma",
  "H&M",
  "HRX",
  "Here & Now",
  "killer",
  "Poopies",
  "Noosh",
  "Gucci",
];

const names = [
  "HRX by Hrithik Roshan",
  "Calvin Klein Jeans",
  "HERE&NOW",
  "Moda Rapido",
  "Wrangler",
  "Wrogn",
  "Louis Phillipe Sport",
];

function start() {
  for (let i = 0; i < 5; i++) {
    const p = Math.floor(Math.random() * 1000);
    const price = new Price({
      vendorPrice: p - 100,
      offerPrice: p,
      currency: "INR",
      mrp: p + 500,
      startAt: new Date(),
      endAt: new Date(2025, 01, 01),
    });

    price.save();

    const product = new Product({
      name: names[Math.floor(Math.random() * names.length)],
      description: faker.commerce.productDescription(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      images: ["http://localhost:8080/images/men/m1.webp"],
      sold: 140,
      price: price._id,
      quantity: Math.floor(Math.random() * 100),
    });

    product.save();
  }
}

module.exports = {
  start,
};
