const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    minLength: 1,
    maxLength: 100,
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 500,
  },
  isActive: Boolean,
});

const Lookup = mongoose.model("Lookup", lookupSchema);

module.exports = Lookup;
