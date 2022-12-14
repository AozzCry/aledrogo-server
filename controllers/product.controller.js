const Product = require("../model/product.model");
const { upload } = require("../utils/multerAlbum");

const fs = require("fs").promises;
const path = require("path");

const getAll = () => Product.find();

const getOne = (id) => Product.findOne({ _id: id });

const create = async (req, res) => {
  const productPhotos = [];

  upload(req, res, async (err) => {
    if (err) {
      throw new Error(err.message);
    }

    const { name, price, count, desc, image_url, category } = req.body;

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        productPhotos.push(req.files[i].path.toString());
      }
    }

    await Product.create({
      name,
      price,
      count,
      desc,
      image_url,
      category,
      userId: req.user._id,
      images_url: productPhotos,
    });
  });
};

const update = async (id, body) => {
  const { name, price, count, desc, category, reviews } = body;

  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.count = count ? count : product.count;
    product.desc = desc ? desc : product.desc;
    product.category = category ? category : product.category;
    product.reviews = reviews ? reviews : product.reviews;
    product.save();
  });
};

const del = (id, user, res) => {
  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return res.json("Product not found.");

    product.images_url.forEach((productImg) =>
      fs.unlink(path.join(__dirname, "..", productImg))
    );

    product.remove();
    res.json("Product deleted.");
  });
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  del,
};
