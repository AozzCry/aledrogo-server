const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const { productModel: Product } = require("../model/product.model");

const getUser = (user) => {
  if (user) return { name: user.name, email: user.email };
  else throw new Error();
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
    userId: "62f637f3717cf5c8be589825",
  }).exec();
  if (user) return products;
  else throw new Error();
};

module.exports = {
  getUser,
  editUserInfo,
  getUserProduct,
};
