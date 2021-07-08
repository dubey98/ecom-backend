const passport = require("passport");
const localStrtaegy = require("passport-local").Strategy;

passport.use(
  new localStrtaegy(function (username, password, done) {
    if (username === "shiv") {
      if (password === "pass") {
        return done(null, { username, password });
      } else {
        return done(null, false, { message: "password incomrrect" });
      }
    } else {
      return done(null, false, { message: "username incorrect" });
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
