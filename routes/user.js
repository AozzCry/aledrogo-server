const express = require("express");

const userRouter = express.Router();

const { checkIsAuth } = require("../utils/checkIsAuth");

const {
  getUser,
  editUserInfo,
  getUserProduct,
} = require("../controllers/user.controller");

userRouter
  .get("/", checkIsAuth, (req, res) => {
    const { user } = req;
    try {
      res.json(getUser(user));
    } catch (e) {
      res.status(404).json("User Not Found.");
    }
  })

  .post("/", checkIsAuth, (req, res) => {
    const { user, body } = req;

    try {
      editUserInfo(user, body);
      res.json(`User info saved.`);
    } catch (e) {
      res.status(304).json(e);
    }
  })

  .get("/products", checkIsAuth, async (req, res) => {
    const { user } = req;
    try {
      const products = await getUserProduct(user);

      res.json(products);
    } catch (e) {
      res.status(404).json("Products not found");
    }
  });

module.exports = {
  userRouter,
};
