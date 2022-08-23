const express = require("express");

const User = require("../model/user.model");
const Product = require("../model/product.model");

const { checkIsAuth } = require("../utils/checkIsAuth");

const wishlistRouter = express.Router();

const { getAll, create, del } = require("../controllers/wishlist.controller");

wishlistRouter
  .get("/", checkIsAuth, async (req, res) => {
    try {
      const wishlist = await getAll(req.user);

      res.status(200).json(wishlist);
    } catch (e) {
      res.status(404).json("Wishlist not found.");
    }
  })

  .post("/", checkIsAuth, async (req, res) => {
    const { productId } = req.body;
    const { _id } = req.user;

    User.findOne({ _id: _id }, (err, user) => {
      if (err) throw err;
      if (!user) return "Product not found";

      if (user.wishlist.includes(productId))
        return res.json("Product already is on wishlist.");

      user.wishlist.push(productId);
      user.save();
      res.status(200).json("Product added to wishlist.");
    });
  })

  .delete("/:id", checkIsAuth, async (req, res) => {
    const { _id: userId } = req.user;
    const { id: productId } = req.params;

    try {
      await del(userId, productId);
      res.status(200).json("Product removed from wishlist.");
    } catch (e) {
      console.error(e);
      res.status(418).json("No content");
    }
  });

module.exports = {
  wishlistRouter,
};
