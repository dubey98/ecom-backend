const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

//import database connection
const db = require("./api/config/db");

//import the routes
const apiRouter = require("./api/v1/router");
const passport = require("passport");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//passport middleware
app.use(passport.initialize());

app.use(express.static("public"));
//define routes
app.use("/api/v1", apiRouter);

//populate database for values
//uncomment to populate dbs
//require("./populateDB/populatelookupCategories").start();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Route not found.");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  const message = req.app.get("env") === "development" ? err : {};
  res.status(res.statusCode || 500).json({ success: false, error: message });
});

module.exports = app;
