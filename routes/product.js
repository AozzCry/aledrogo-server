const express = require("express");

const { checkIsAuth } = require("../utils/checkIsAuth");

const productRouter = express.Router();

const {
  getOne,
  getAll,
  create,
  update,
  del,
} = require("../controllers/product.controller");

productRouter
  .get("/", async (req, res) => {
    try {
      const products = await getAll();

      res.status(200).json(products);
    } catch (e) {
      res.status(404).json("Products not found.");
    }
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const product = await getOne(id);

      res.status(200).json(product);
    } catch (e) {
      res.status(404).json("Product not found.");
    }
  })

  .post("/", checkIsAuth, async (req, res) => {
    try {
      await create(req, res);
      res.status(201).json("Product added.");
    } catch (e) {
      res.status(400).json(e.message);
    }
  })

  .put("/:id", checkIsAuth, async (req, res) => {
    const { id } = req.params;

    try {
      await update(id, req.body, req.user);
      res.status(202).json("Product updated");
    } catch (e) {
      res.status(304).json("Product not modified.");
    }
  })

  .delete("/:id", checkIsAuth, async (req, res) => {
    const { id } = req.params;

    try {
      del(id, req.user, res);
    } catch (e) {
      console.error(e);
      res.status(418).json("No content");
    }
  });

module.exports = {
  productRouter,
};
