const User = require("./../models/User");
const { body, validationResult } = require("express-validator");

exports.getAll = (req, res) => {
  User.find().exec((err, userList) => {
    if (err) {
      return res.status(500).json("Error while retreiving the user list.");
    }
    if (userList) {
      return res.json(userList);
    }
  });
};

exports.findById = (req, res, next) => {
  const id = req.params.id;

  User.findById(id, {}, {}, (err, user) => {
    if (err) {
      console.log("Error while retreiving user");
      return next(err);
    }
    return res.json({ success: true, user });
  });
};

exports.createOne = [
  body("username", "Username must be atleast 5 characters long")
    .trim()
    .isLength({ min: 5 }),
  body("email", "email is not a proper mail.").trim().isEmail(),
  body("contact").trim().isMobilePhone("en-IN"),
  (req, res) => {
    const errors = validationResult(req);
    if (errors) {
      return res.json({
        success: false,
        error: errors.array(),
      });
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      contact: req.body.contact,
    });
    newUser.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          error: "Error while creating new user.",
        });
      }
      return res.json({ success: true, user });
    });
  },
];

exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, {}, (err, user) => {
    if (err) {
      console.log("Error while deleting user", err);
      return next(err);
    }
    if (user) {
      return res.json({ success: true, user });
    }
    return next();
  });
};

exports.updateOne = [
  body("username", "Username must be atleast 5 characters long")
    .trim()
    .isLength({ min: 5 }),
  body("email", "email is not a proper mail.").trim().isEmail(),
  body("contact").trim().isMobilePhone("en-IN"),
  (req, res, next) => {
    const error = validationResult(req);
    if (error) {
      return next(error);
    }

    const id = req.params.id;

    const user = new User({
      _id: id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      contact: req.body.contact,
    });
    user.findByIdAndUpdate(id, user, {}, (err, user) => {
      if (err) {
        console.log("Ërror while updating the user", err);
        return next(err);
      }
      return res.json({
        success: true,
        user,
      });
    });
  },
];
