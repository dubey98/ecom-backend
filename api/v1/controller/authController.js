const { body, validationResult } = require("express-validator");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const saltRounds = process.env.salt_rounds;

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
      if (found_user) {
        if (bcrypt.compareSync(req.body.password, found_user.password)) {
           
        }
      }
    });
  }
};

exports.signup = function (req, res) {
  const { errors } = validationResult(req);

  if (errors.length !== 0 || req.body.password !== req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword) {
      errors.push({
        value: req.body.password,
        msg: "Password and confirm password dont match",
        param: "confirmPassword",
      });
    }
    return res.json({ errors: errors });
  } else {
    User.findOne({ username: req.body.username }).exec((err, found_user) => {
      if (err) {
        return res.status(500).json("Error while finding the user");
      }
      if (found_user) {
        errors.push({
          value: req.body.username,
          param: "username",
          msg: "The username already exists.",
        });
        return res.json({ ...req.body, errors });
      }
      const hashedPassword = bcrypt.hashSync(
        req.body.password,
        parseInt(saltRounds)
      );
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      user.save((err) => {
        if (err) {
          return res.json("Error while creating the user");
        }
        return res.json(user);
      });
    });
  }
};
