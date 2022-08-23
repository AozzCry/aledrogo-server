const Product = require("../model/product.model");
const User = require("../model/user.model");

const getAll = (user) =>
  Product.find({
    _id: { $in: user.wishlist },
  });

const del = (userId, productId) => {
  User.findOne({ _id: userId }, (err, user) => {
    if (err) throw err;
    if (!user) return "User not found";
    if (!user.wishlist.includes(productId))
      return res.json("Product does not exist on wishlist.");

    user.wishlist.remove(productId);
    user.save();
  });
};

module.exports = {
  getAll,
  del,
};
