const LookupCategory = require("../models/LookupCategory");
const Lookup = require("../models/Lookup");
const { body, validationResult } = require("express-validator");
const helpers = require("../helpers/helper");

exports.getAll = (req, res, next) => {
  LookupCategory.find()
    .populate("subCategories")
    .populate("lookups")
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ success: true, doc });
    });
};

exports.getOne = (req, res, next) => {
  const id = req.params.id;

  LookupCategory.find({ _id: id })
    .populate("subCategories")
    .populate("lookups")
    .exec((err, lookupCategory) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!lookupCategory) {
        const error = helpers.createError(
          "id",
          "cannot find any document with this id."
        );
        return next(error);
      }
      return res.json({ success: true, lookupCategory });
    });
};

exports.count = (req, res, next) => {
  LookupCategory.countDocuments((err, count) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (count) {
      return res.json({ count });
    }
    return res.json("whtf happened");
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  LookupCategory.findByIdAndDelete(id, {}, (err, doc) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, doc });
  });
};

exports.create = [
  body("name", "name is mandatory").trim().notEmpty().isString(),
  body("description", "A description would be nice")
    .trim()
    .notEmpty()
    .isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      next(errors.array());
    }

    const lookupCategory = new LookupCategory({
      name: req.body.name,
      description: req.body.description,
    });

    if (validateReq(req, "category")) {
      LookupCategory.countDocuments((err, count) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        for (let category of req.body.subCategories) {
          const tempCategory = new LookupCategory({
            id: count + 1,
            name: category.name,
            description: category.description,
          });
          tempCategory.save((err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
          });
          lookupCategory.subCategories.push(tempCategory._id);
          count++;
        }
      });
    }

    if (validateReq(req, "lookup")) {
      Lookup.countDocuments({}, (err, lookupCount) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        for (let lookup of req.body.lookups) {
          const tempLookup = new Lookup({
            id: lookupCount + 1,
            name: lookup.name,
            description: lookup.description,
          });
          tempLookup.save();
          lookupCategory.lookups.push(tempLookup);
          lookupCount++;
        }
      });
    }

    LookupCategory.countDocuments({}, (err, count) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      lookupCategory.id = count + 1;
      lookupCategory.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json({ success: true, lookupCategory });
      });
    });
  },
];

exports.update = [
  body("name", "name is mandatory").trim().notEmpty().isString(),
  body("description", "A description would be nice")
    .trim()
    .notEmpty()
    .isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      next(errors.array());
    }

    const id = req.params.id;

    const lookupCategory = new LookupCategory({
      _id: id,
      name: req.body.name,
      description: req.body.description,
    });

    if (validateReq(req, "category")) {
      LookupCategory.countDocuments((err, count) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        for (let category of req.body.subCategories) {
          const tempCategory = new LookupCategory({
            id: count + 1,
            name: category.name,
            description: category.description,
          });
          tempCategory.save((err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
          });
          lookupCategory.subCategories.push(tempCategory._id);
          count++;
        }
      });
    }

    if (validateReq(req, "lookup")) {
      Lookup.countDocuments({}, (err, lookupCount) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        for (let lookup of req.body.lookups) {
          const tempLookup = new Lookup({
            id: lookupCount + 1,
            name: lookup.name,
            description: lookup.description,
          });
          tempLookup.save();
          lookupCategory.lookups.push(tempLookup);
          lookupCount++;
        }
      });
    }

    LookupCategory.countDocuments({}, (err, count) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      lookupCategory.id = count + 1;
      lookupCategory.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json({ success: true, lookupCategory });
      });
    });
  },
];

/**
 * validate is the req has foloowing fields
 * @param {Object} req request
 * @param {string} doc category or lookups
 * @returns
 */
function validateReq(req, doc) {
  let retVal = false;
  switch (doc) {
    case "category":
      retVal =
        req.body.subCategories !== null &&
        Array.isArray(req.body.subCategories) &&
        req.body.subCategories.length > 0;
      break;
    case "lookup":
      retVal =
        req.body.lookups !== null &&
        Array.isArray(req.body.lookups) &&
        req.body.lookups.length > 0;
      break;
    default:
      break;
  }
  console.log("req validation status ", retVal);
  return retVal;
}
