const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lookupCategorySchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    minLength: 1,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 200,
  },
  lookups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lookup",
    },
  ],
});
