const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const Product = require("../model/product.model");
const { upload } = require("../utils/multerAvatar");

const getUser = (user) => {
  if (user)
    return {
      name: user.name,
      email: user.email,
      wishlist: user.wishlist,
      avatar: user.avatar,
    };
  else throw new Error("User not found");
};

const editUserInfo = (user, body) => {
  User.findOne({ email: user.email }, async (err, user) => {
    if (err) throw err;
    if (!user) return new Error("Not found user.");

    user.name = body.name ? body.name : user.name;
    user.password = body.password
      ? await bcrypt.hash(body.password, 10)
      : user.password;
    user.save();
  });
};

const getUserProduct = async (user) => {
  const products = await Product.find({
    userId: user._id,
  }).exec();
  if (user) return products;
  else throw new Error();
};

const setAvatar = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      throw new Error(err.message);
    }

    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) throw err;
      if (!user) return "User not found";

      user.avatar = req.file.path;
      user.save();
    });
  });
};

module.exports = {
  getUser,
  editUserInfo,
  getUserProduct,
  setAvatar,
};
