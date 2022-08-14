const { Schema, model } = require("mongoose");

const { reviewSchema: review } = require("./review.model");

const productModel = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  count: { type: Number, min: 0 },
  desc: String,
  image_url: [String],
  category: { type: [String], index: true },
  reviews: [review],
  userId: String,
});

module.exports = {
  productModel: model("Product", productModel),
  productSchema: productModel,
};
