const express = require("express");
const router = express.Router();
const passport = require("./../config/passport");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const shopRouter = require("./routes/shopRouter");
const adminRouter = require("./routes/adminRouter");
const vendorRouter = require("./routes/vendorRouter");

router.use("/auth", authRouter);

router.use("/shop/", shopRouter);

router.use(
  "/user",
  passport.authenticate(["jwt", "local"], { session: false }),
  userRouter
);

router.use(
  "/vendor",
  passport.authenticate(["jwt", "local"], { session: false }),
  vendorRouter
);

router.use(
  "/admin",
  passport.authenticate(["jwt", "local"], { session: false }),
  adminRouter
);

module.exports = router;
