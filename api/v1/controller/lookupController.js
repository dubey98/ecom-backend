const { body, validationResult } = require("express-validator");
const Lookup = require("./../models/Lookup");
const LookupCategory = require("./../models/LookupCategory");

exports.getOne = (req, res, next) => {
  const id = req.params.id;

  Lookup.findById(id, "name description", {}, (err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.getAll = (req, res, next) => {
  Lookup.find({}).exec((err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.create = [
  body("name", "name must be provided").trim().isString().notEmpty(),
  body("description", "description not provided").trim().notEmpty().isString(),
  body("isActive", "must be a boolean").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    const id = req.params.id;

    const lookup = new Lookup({
      name: req.body.name,
      description: req.body.description,
      isActive: req.body.isActive,
    });

    if (id) {
      LookupCategory.find({ _id: id })
        .populate("lookups")
        .exec((err, lookupCategory) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          lookupCategory.lookups.push(lookup);
          lookupCategory.save((err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            return res.json({
              success: true,
              lookup,
            });
          });
        });
    }

    lookup.save((err, newLookup) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json({ success: true, newLookup });
    });
  },
];

exports.delete = (req, res, next) => {
  const id = req.params.id;

  Lookup.findByIdAndDelete(id, {}, (err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.update = [
  body("name", "name must be provided").trim().isString().notEmpty(),
  body("description", "description not provided").trim().notEmpty().isString(),
  body("isActive", "must be a boolean").isBoolean(),
  (req, res, next) => {
    const id = req.params.id;

    const lookup = new Lookup({
      _id: id,
      name: req.body.name,
      description: req.body.description,
    });
    Lookup.findByIdAndUpdate(id, lookup, (err, updated) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ success: true, updated });
    });
  },
];
