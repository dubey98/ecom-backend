const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGODB_URI, options, function (err) {
  onError(err);
});

const db = mongoose.connection;

function onError(err) {
  if (err) {
    console.log("Error in connecting to the database\n");
    console.log(err.message);
  }
}

module.exports = db;
