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
          res.json(info.message);
        });
      }
    })(req, res, next);
  })

  .post("/register", (req, res) => {
    const { email, name, password } = req.body;

    User.findOne({ email: email }, async (err, user) => {
      if (err) throw err;
      if (user) res.json("User Already Exists");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
          email,
          name,
          password: hashedPassword,
        });

        res.json("User Created successfully.");
      }
    });
  })

  .post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.json("Logged out.");
    });
  });

module.exports = {
  authRouter,
};
