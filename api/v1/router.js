const express = require("express");
const router = express.Router();

const userRouter = require("./routes/userRouter");
const addressRouter = require("./routes/addressRouter");
const authRouter = require("./routes/authRouter");
const lookupCategoryRouter = require("./routes/lookupCategoryRouter");
const lookupRouter = require("./routes/lookupRouter");
const passport = require("./../config/passport");

router.use("/auth", authRouter);

router.use(
  "/user",
  passport.authenticate(["jwt", "local"], { session: false }),
  userRouter
);

router.use(
  "/address",
  passport.authenticate(["jwt", "local"], { session: false }),
  addressRouter
);

router.use("/lookup-category", lookupCategoryRouter);

router.use("/lookup", lookupRouter);

module.exports = router;
