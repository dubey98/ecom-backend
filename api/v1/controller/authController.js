const { body, validationResult } = require("express-validator");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stringConstants = require("./../constants/stringConstants");
const secret = process.env.secret;
const userController = require("./../controller/userController");

exports.index = function (req, res) {
  res.json({ message: "made req to /auth/ working fine." });
};

exports.login = function (req, res) {
  const { errors } = validationResult(req);

  if (errors.length !== 0) {
    return res.json({ errors: errors });
  } else {
    User.findOne({ username: req.body.username }).exec((err, found_user) => {
      if (err) {
        return res.status(500).json("Error while finding the user");
      }
      const token = createToken(found_user);
      return res.json({ success: true, token });
    });
  }
};

exports.signup = [
  body("email")
    .isString()
    .trim()
    .isEmail()
    .custom((value) => {
      User.findOne({ email: value }, "email", (err, user) => {
        if (err) {
          throw new Error(stringConstants.userNotFound);
        }
        if (user) {
          throw new Error(stringConstants.emailInUse);
        }
        return true;
      });
    }),
  body("password").isString().trim(),
  body("confirmPassword")
    .isString()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return new Error(stringConstants.passwordDontMatch);
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
