const { reviewModel: modelReview } = require("../model/review.model");
const { productModel: Product } = require("../model/product.model");

const addReview = (text, grade, id) => {
  const review = new modelReview({ text, grade });
  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found";

    product.reviews.push(review);
    product.save();
  });
};

module.exports = {
  addReview,
};
