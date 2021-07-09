const express = require("express");
const router = express.Router();

const userRouter = require("./routes/userRouter");
const addressRouter = require("./routes/addressRouter");
const authRouter = require("./routes/authRouter");
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

module.exports = router;
