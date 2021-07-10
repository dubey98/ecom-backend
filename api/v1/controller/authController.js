const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stringConstants = require("../constants/stringConstants");
const secret = process.env.secret;

exports.login = function (req, res) {
  const { errors } = validationResult(req);

  if (errors.length !== 0) {
    return res.json({ errors: errors });
  } else {
    User.findOne(
      { email: req.body.email },
      "_id username email name",
      {},
      (err, found_user) => {
        if (err) {
          return next(err);
        }
        const token = createToken(found_user);
        return res.json({ success: true, token });
      }
    );
  }
};

exports.signup = [
  body("email", "email must be a valid email-address.")
    .isString()
    .trim()
    .isEmail(),
  body("email", "email must be unique.").custom((value) => {
    return User.findOne({ email: value }, "email", (err, user) => {
      if (err) {
        return new Promise.reject(stringConstants.userNotFound);
      }
      if (user) {
        console.log(user);
        return false;
      }
      return true;
    });
  }),
  body("password").isString().trim(),
  body("confirmPassword", "passwords don't match.")
    .isString()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(stringConstants.passwordDontMatch);
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("came here ", errors);
      return next(errors);
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err, found_user) => {
      if (err) {
        console.log("Error creating user in signup.");
        return next(err);
      }
      const token = createToken(found_user);
      return res.json({ success: true, token });
    });
  },
];

function createToken(user) {
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const accessInfo = {
      username: user.username,
      sub: user._id,
    };
    const accessToken = jwt.sign(accessInfo, secret);
    return "Bearer " + accessToken;
  }
}
