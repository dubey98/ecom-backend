const User = require("../models/User");
const { Product } = require("./../models/Product");
const { body, query, param, validationResult } = require("express-validator");
const { Cart, OrderItem } = require("../models/Order");
const { mapProductsListDTO, mapCartToDTO } = require("../helpers/helper");

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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("in error of create one");
      return next(errors);
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
        return next(err);
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

exports.getCart = [
  query("id", "id not correct.").notEmpty().isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    const id = req.query.id;

    User.findById(id).exec((err, cartId) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      Cart.findOne({ _id: cartId.cart })
        .populate({
          path: "orderItems",
          populate: {
            path: "product",
            model: "Product",
          },
        })
        .exec((err, cart) => {
          if (err) {
            console.log(err);
            return next(err);
          }

          const retCart = mapCartToDTO(cart);
          return res.json({ success: true, cart: retCart });
        });
    });
  },
];

exports.addToCart = (req, res, next) => {
  const productId = req.body.id;
  const quantity = req.body.quantity || 1;
  const userId = req.user.id;

  User.findOne({ _id: userId }).exec((err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user.cart) {
      const _cart = new Cart();
      user.cart = _cart._id;
      _cart.save();
      user.save();
      _addToCart(_cart._id);
    } else {
      _addToCart(user.cart);
    }
  });

  function _addToCart(cartId) {
    Cart.findOne({ _id: cartId })
      .populate("orderItems")
      .exec((err, cart) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (cart) {
          Product.findOne({ _id: productId })
            .populate("price")
            .exec((err, product) => {
              if (err) {
                console.log(err);
                return next(err);
              }
              let index = cart.orderItems.findIndex(
                (orderItem) => orderItem.product._id == productId
              );
              if (index === -1) {
                const orderItem = new OrderItem({
                  product: product._id,
                  quantity: quantity,
                  freezedPrice: product.price.offerPrice,
                });
                orderItem.save();
                cart.orderItems.push(orderItem);
                cart.save();
              } else {
                let orderItem = cart.orderItems[index];

                orderItem.quantity = quantity;
                orderItem.save();
              }
              return res.json({ success: true });
            });
        } else {
          console.log(err);
          return next(err);
        }
      });
  }
};

exports.removeFromCart = (req, res, next) => {
  const productId = req.body.id;
  const userId = req.user.id;
  console.log(productId, userId);

  User.findById(userId)
    .populate()
    .exec((err, user) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      Cart.findOne({ _id: user.cart })
        .populate("orderItems")
        .exec((err, cart) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          let index = cart.orderItems.findIndex(
            (orderItem) =>
              orderItem.product._id.toString() == productId.toString()
          );
          if (index !== -1) {
            console.log(index);
            cart.orderItems.splice(index, 1);
            cart.save();
            return res.json({ success: true, message: "successfully removed" });
          }
          return res.json({ success: false, message: "product Id is wrong" });
        });
    });
};

exports.addToFav = [
  body("id", "Bad request").isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const userId = req.user.id;
    const productId = req.body.id;

    Product.findById(productId, (err, product) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      User.findById(userId, (err, user) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!user.favourites.includes(productId)) {
          user.favourites.push(product);
          console.log("Adding to the fav");
        }
        user.save((err) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          return res.json({ success: true });
        });
      });
    });
  },
];

exports.getFav = [
  param("id", "must be a valid Id")
    .isMongoId()
    .custom((value, { req }) => {
      if (value.toString() == req.user.id.toString()) {
        return Promise.resolve();
      } else {
        return Promise.reject("token and request are not for the same Id's");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const userId = req.user.id;

    User.findOne({ _id: userId })
      .populate({
        path: "favourites",
        populate: {
          path: "price",
          model: "Price",
        },
      })
      .exec((err, user) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        const retProductList = mapProductsListDTO(user.favourites);

        return res.json({
          success: true,
          products: retProductList,
        });
      });
  },
];

exports.getAllAddresses = (req, res, next) => {};

exports.getOneAddress = (req, res, next) => {};

exports.createAddress = (req, res, next) => {};

exports.deleteAddress = (req, res, next) => {};

exports.updateAddress = (req, res, next) => {};
