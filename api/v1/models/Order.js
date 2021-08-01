const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { OrderStatus } = require("./../constants/Category");

const OrderStatusArray = Object.keys(OrderStatus);

const orderSchema = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    shippedAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    orderStatus: {
      type: String,
      enum: OrderStatusArray,
      default: "OPEN",
    },
    orderTotal: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      min: 1,
    },
    freezedPrice: {
      type: Number,
    },
    currency: String,
  },
  { timestamps: true }
);

const shoppingCartSchema = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
const Cart = mongoose.model("Cart", shoppingCartSchema);

module.exports = {
  Order,
  OrderItem,
  Cart,
};
