const { Schema, model } = require("mongoose");

const { reviewSchema } = require("./review.model");

const productModel = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  count: { type: Number, min: 0 },
  desc: String,
  images_url: [String],
  category: [String],
  reviews: [reviewSchema],
  userId: String,
  timesBought: Number,
});

module.exports = model("Product", productModel);
