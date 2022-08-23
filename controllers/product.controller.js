const Product = require("../model/product.model");
const { upload } = require("../utils/multerAlbum");

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
  const { name, price, count, desc, image_url, category, reviews } = body;

  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.count = count ? count : product.count;
    product.desc = desc ? desc : product.desc;
    product.image_url = image_url ? image_url : product.image_url;
    product.category = category ? category : product.category;
    product.reviews = reviews ? reviews : product.reviews;
    product.save();
  });
};

const del = (id) => {
  Product.findOne({ _id: id }, (err, product) => {
    if (err) throw err;
    if (!product) return "Product not found.";

    product.remove();
  });
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  del,
};
