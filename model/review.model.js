const { Schema, model } = require("mongoose");

const reviewModel = new Schema({
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  grade: { type: Number, min: 1, max: 5 },
});

module.exports = {
  reviewModel: model("Review", reviewModel),
  reviewSchema: reviewModel,
};
