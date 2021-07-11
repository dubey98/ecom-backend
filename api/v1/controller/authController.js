const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const stringConstants = require("../constants/stringConstants");
const secret = process.env.secret;

exports.login = [
  body("email", "email must be a valid email address")
    .notEmpty()
    .trim()
    .isEmail(),
  body("email", "email or password incorrect").custom((value) => {
    return User.findOne({ email: value }, "email", {}, (err, user) => {
      if (err) {
        console.log(err);
        return false;
      }
      if (user) {
        return false;
      }
      return true;
    });
  }),
  body("password", "password cannot be empty").notEmpty().trim().isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.isEmpty());
      console.log("returning error from validation ");
      return next(errors.array());
    }
    const { email, password } = req.body;
    User.findOne(
      { email: email },
      "_id username email name password",
      {},
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next("user not found");
        }
        user.comparePassword(password, user.password, (err, same) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!same) {
            const error = new Error("The password is incorrect");
            return next(error);
          }
          const token = createToken(user);
          return res.json({ success: true, token });
        });
      }
    );
  },
];

exports.signup = [
  body("email", "email must be a valid email-address.")
    .isString()
    .trim()
    .isEmail(),
  body("email", "email already in use.").custom((value) => {
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
      return next(errors.array());
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err, user) => {
      if (err) {
        console.log("Error creating user in signup.", err);
        return next(err);
      }
      const token = createToken(user);
      return res.json({ success: true, token });
    });
  },
];

function createToken(user) {
  const accessInfo = {
    username: user.username,
    sub: user._id,
  };
  const accessToken = jwt.sign(accessInfo, secret);
  return "Bearer " + accessToken;
}
