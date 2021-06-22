const express = require("express");
const router = express.Router();

const userRouter = require("./routes/userRoutes");
const addressRouter = require("./routes/addressRouter");

router.use("/user", userRouter);

router.use("/address", addressRouter);

module.exports = router;
