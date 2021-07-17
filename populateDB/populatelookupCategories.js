const categories = require("../api/v1/constants/Category");

const LookupCategory = require("../api/v1/models/LookupCategory");
const Lookup = require("../api/v1/models/Lookup");

exports.start = () => {
  populateLookupCategory();
};

function populateLookupCategory() {
  const root = new LookupCategory({
    name: "dropdown lookup",
    id: 1,
    description: "Main root category for dropdowns",
    isActive: true,
  });

  populateArray(
    root.subCategories,
    categories.category,
    LookupCategory,
    2,
    false
  );
  populateLookups(root);

  for (let sub of root.subCategories) {
    sub.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  root.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("successfully populated lookups and lookup Categories");
  });
}

function populateLookups(root) {
  // pick the men subcategory from the roots list
  const men = root.subCategories[0];
  //populate lookups for the men category
  let lookupCount = populateArray(
    men.lookups,
    categories.MenSubcategory,
    Lookup,
    1
  );

  const women = root.subCategories[1];
  lookupCount = populateArray(
    women.lookups,
    categories.WomenSubcategory,
    Lookup,
    lookupCount
  );

  const kids = root.subCategories[2];
  lookupCount = populateArray(
    kids.lookups,
    categories.KidsSubcategory,
    Lookup,
    lookupCount
  );

  const homeLiving = root.subCategories[3];
  lookupCount = populateArray(
    homeLiving.lookups,
    categories.homeAndLivingSubcategory,
    Lookup,
    lookupCount
  );

  const beauty = root.subCategories[4];
  lookupCount = populateArray(
    beauty.lookups,
    categories.BeautySubcategory,
    Lookup,
    lookupCount
  );
}

/**
 * populate array from object
 * @param {Array} root Array to be populated
 * @param {Object} obj Object to populate from
 * @returns
 */
function populateArray(root, obj, model, index, save = true) {
  for (let [key, values] of Object.entries(obj)) {
    const new_model = new model({
      id: index,
      name: key.toString(),
      description: values.toString(),
      isActive: true,
    });
    if (save) {
      new_model.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
    root.push(new_model);
    index++;
  }
  return index;
}
