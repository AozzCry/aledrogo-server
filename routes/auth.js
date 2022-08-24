const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const authRouter = express.Router();

const User = require("../model/user.model");

authRouter
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.json(info.message);
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.json({message: info.message, user: {_id: user._id,email: user.email, name: user.name, wishlist: user.wishlist, avatar: user.avatar}});
        });
      }
    })(req, res, next);
  })

  .post("/register", (req, res) => {
    const { email, name, password } = req.body;

    User.findOne({ email: email }, async (err, user) => {
      if (err) throw err;
      if (user) res.status(401).json("User Already Exists");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
          email,
          name,
          password: hashedPassword,
          avatar: "avatars/default.png",
        });

        res.json("User Created successfully.");
      }
    });
  })

  .post("/logout", function (req, res, next) {
    req.logout(function (err) {
      req.session.destroy(function (err) {});
    });
  });

module.exports = {
  authRouter,
};
