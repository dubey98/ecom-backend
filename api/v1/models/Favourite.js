const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 100,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
