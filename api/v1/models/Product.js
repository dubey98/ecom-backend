const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    maxLength: 200,
    minLength: 5,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  brand: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
