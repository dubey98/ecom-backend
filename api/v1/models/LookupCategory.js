const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lookupCategorySchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    minLength: 1,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 200,
  },
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "LookupCategory",
    },
  ],
  lookups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lookup",
    },
  ],
  isActive: Boolean,
});

// TODO : throws error in model.countDocuments
// lookupCategorySchema.pre("save", function (next) {
//   if (this.id == null || this.id == 0) {
//     LookupCategory.countDocuments({}, function (err, count) {
//       if (err) {
//         console.log(err);
//         return next(err);
//       }
//       this.id = count + 1;
//       next();
//     });
//   }
// });

const LookupCategory = mongoose.model("LookupCategory", lookupCategorySchema);

module.exports = LookupCategory;
