const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
