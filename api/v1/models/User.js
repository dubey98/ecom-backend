const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  /***************Personal details  *****************/
  name: {
    first: { type: String, maxLength: 50 },
    last: { type: String, maxLength: 50 },
    middle: { type: String, maxLength: 50 },
  },
  username: { type: String, unique: true },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: String,
  },
  /*****************Address proofs***************** */
  defaultAddress: {
    type: Schema.Types.ObjectId,
    ref: "address",
  },
  addressList: [
    {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
  ],
  /***************Order List and favourite List *****/
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
});

/** virtual property for fullname */
userSchema.virtual("fullname").get(function () {
  this.name.first + " " + this.name.last;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
