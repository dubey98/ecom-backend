const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  // name of the person to deliver to
  name: {
    type: String,
    maxLength: 100,
    required: true,
  },
  // thier contact number
  mobile: {
    type: String,
    maxLength: 15,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  State: {
    type: String,
    maxLength: 50,
    required: true,
  },
  // House no, Building, Street, Area
  addressLine: {
    type: String,
    maxLength: 200,
    required: true,
  },
  // Locality / town
  locality: {
    type: String,
    maxLength: 200,
    required: true,
  },
  // city / District
  city: {
    type: String,
    maxLength: 200,
    required: true,
  },
  typeOfAddress: {
    type: String,
    enum: ["Home", "Office"],
    default: "Office",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
