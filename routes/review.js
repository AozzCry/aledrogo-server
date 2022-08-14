const express = require("express");

const reviewRouter = express.Router();

const { addReview } = require("../controllers/review.controller");

reviewRouter.post("/", async (req, res) => {
  const { text, grade, id } = req.body;

  addReview(text, grade, id);

  res.json("Review added");
});

module.exports = {
  reviewRouter,
};
