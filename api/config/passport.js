const passport = require("passport");
const localStrtaegy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./../v1/models/User");
const bcrypt = require("bcrypt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secret,
};

passport.use(
  new jwtStrategy(options, function (payload, done) {
    User.findOne({ _id: payload.sub.id }, function (err, user) {
      if (err) {
        console.log(err, "error in passport JWT");
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.use(
  new localStrtaegy(function (username, password, done) {
    console.log("passport local");
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    });
  })
);

/**
 * passport seriallize and deseriallize uuser are only required when you are
 * storing the user in session
 */
// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

module.exports = passport;
