const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  orderTotal: {
    type: Number,
    default: 0.0,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
