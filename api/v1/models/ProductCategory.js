const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
    enum: ["Men", "Women", "Kids", "Home & Living", "Beauty", "None"],
    defaulr: "None",
  },
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
