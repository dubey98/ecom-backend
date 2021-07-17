const { body, validationResult } = require("express-validator");

exports.createProduct = [
  body("name", "product name not provided.").trim().isString().notEmpty(),
  body("description", "product description not provided.")
    .trim()
    .isString()
    .notEmpty(),
  body("price", "product price not provided.").notEmpty(),
  body("brand", "product brand not provided.").trim().isString().notEmpty(),
  body("vendorPrice").isNumeric(),
  body("offerPrice").isNumeric(),
  body("mrp").isNumeric(),
  body("endAt").isDate(),
  body("quantity", "product quantity not provided.").isNumeric().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    const images = req.body.images;

    const newPrice = new Price({
      vendorPrice: req.body.vendorPrice || req.body.price,
      offerPrice: req.body.offerPrice || req.body.price,
      mrp: req.body.mrp || req.body.price,
      startAt: new Date(),
      endAt: req.body.endAt,
    });

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: newPrice,
      brand: req.body.brand,
    });

    newPrice.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      newProduct.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json({ success: true, newProduct });
      });
    });
  },
];
