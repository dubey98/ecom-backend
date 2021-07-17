const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 200,
      minLength: 5,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    SKU: {
      type: String,
    },
    brand: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      min: [0, "The number of products in stock cannot be less than zero "],
    },
    sold: {
      type: Number,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: "Price",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  },
  { timestamps: true }
);

const priceSchema = new Schema(
  {
    vendorPrice: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    currency: {
      type: String,
    },
    mrp: {
      type: String,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    priceHistory: [
      {
        price: Number,
        startedAt: Date,
        endedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const vendorSchema = new Schema(
  {
    name: String,
    shipAddress: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    BillAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
const Price = mongoose.model("Price", priceSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = {
  Product,
  Price,
  Vendor,
};
