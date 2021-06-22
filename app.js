const express = require("express");
const logger = require("morgan");
require("dotenv").config();

//import database connection
const db = require("./api/config/db");

//import the routes
const apiRouter = require("./api/v1/router");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//define routes
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Route not found.");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  const message = req.app.get("env") === "development" ? err : {};
  res.sendStatus(err.status || 500);
});

module.exports = app;
