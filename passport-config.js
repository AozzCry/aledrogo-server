const User = require("./model/user.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false, { message: "Email no match." });
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user, { message: "Successfully authenticated." });
          } else {
            return done(null, false, { message: "Password is incorrect." });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        _id: user._id,
        email: user.email,
        name: user.name,
        wishlist: user.wishlist,
        avatar: user.avatar,
      };
      done(err, userInformation);
    });
  });
};
