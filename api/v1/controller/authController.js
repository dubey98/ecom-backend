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
  body("email").custom((value) => {
    return User.findOne({ email: value })
      .exec()
      .then((user) => {
        if (user) {
          return Promise.resolve();
        } else return Promise.reject("Email or password incorrect.");
      })
      .catch((err) => {
        console.log(err, "error");
        return Promise.reject("Email or password incorrect.");
      });
  }),
  body("password", "password cannot be empty").notEmpty().trim().isString(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
    return User.findOne({ email: value })
      .exec()
      .then((user) => {
        if (!user) {
          return Promise.resolve();
        } else return Promise.reject("Email already in use");
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
      return res.json({ success: true, token, email: user.email });
    });
  },
];

function createToken(user) {
  const accessInfo = {
    sub: {
      id: user._id,
    },
  };
  const accessToken = jwt.sign(accessInfo, secret);
  return "Bearer " + accessToken;
}
