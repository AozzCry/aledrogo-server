const Product = require("../model/product.model");

const addReview = (text, grade, id, userName) => {
  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.reviews.push({ text, grade, userName });
    product.save();
  });
};

const addCommentToReview = (text, productId, reviewId, userName) => {
  Product.findOne({ _id: productId }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.reviews.id(reviewId).comments.push({ text, userName });
    product.save();
  });
};

module.exports = {
  addReview,
  addCommentToReview,
};
