const faker = require("faker");

const { Product, Vendor, Price } = require("./../api/v1/models/Product");
const { Productcategory } = require("./../api/v1/models/ProductCategory");

function populate() {
  for (let i = 0; i < 5; i++) {
    const product = new Product({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
    });
  }
}

module.exports = populate;
