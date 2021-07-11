const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  /***************Personal details  *****************/
  name: {
    first: { type: String, maxLength: 50 },
    last: { type: String, maxLength: 50 },
    middle: { type: String, maxLength: 50 },
  },
  username: { type: String },
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

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const hash = bcrypt.hashSync(
      user.password,
      parseInt(process.env.salt_rounds)
    );
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 *compare the given password with user stored password
 * @param {string} password password to be matched
 * @param {callback} cb callback that takes two arguments
 * first is error and second is a boolean indicating if passwords are same
 */
userSchema.methods.comparePassword = (password, hashedPassword, cb) => {
  console.log(password, hashedPassword);
  bcrypt.compare(password, hashedPassword, (err, isSame) => {
    if (err) {
      return cb(err, false);
    } else {
      return isSame ? cb(null, true) : cb(null, false);
    }
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
