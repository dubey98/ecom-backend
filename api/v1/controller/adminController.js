const LookupCategory = require("../models/LookupCategory");
const Lookup = require("../models/Lookup");
const { body, validationResult } = require("express-validator");

exports.getAllLookupCategory = (req, res, next) => {
  LookupCategory.find({ id: 1 })
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

exports.deleteAllLookupCategory = (req, res, next) => {
  LookupCategory.deleteMany({}, {}, (err, list) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, list });
  });
};

exports.getOneLookupCategory = (req, res, next) => {
  const id = req.params.id;

  LookupCategory.find({ _id: id })
    .populate("subCategories")
    .populate("lookups")
    .exec((err, lookupCategory) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.json({ success: true, lookupCategory });
    });
};

exports.countLookupCategory = (req, res, next) => {
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

exports.deleteLookupCategory = (req, res, next) => {
  const id = req.params.id;
  LookupCategory.findByIdAndDelete(id, {}, (err, doc) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, doc });
  });
};

exports.createLookupCategory = [
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

exports.updateLookupCategory = [
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

exports.getOneLookup = (req, res, next) => {
  const id = req.params.id;

  Lookup.findById(id, "name description", {}, (err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.getAllLookup = (req, res, next) => {
  Lookup.find({}).exec((err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.deleteAllLookup = (req, res, next) => {
  Lookup.deleteMany({}, {}, (err, list) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, list });
  });
};

exports.createLookup = [
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

exports.deleteLookup = (req, res, next) => {
  const id = req.params.id;

  Lookup.findByIdAndDelete(id, {}, (err, lookup) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ success: true, lookup });
  });
};

exports.updateLookup = [
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
