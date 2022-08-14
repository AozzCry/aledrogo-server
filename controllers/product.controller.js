const { productModel: Product } = require("../model/product.model");

const getAll = () => Product.find();

const getOne = (id) => Product.findOne({ _id: id });

const create = async (body) => {
  const { name, price, count, desc, image_url, category } = body;

  try {
    await Product.create({
      name,
      price,
      count,
      desc,
      image_url,
      category,
      userId: "62f8cd8b65cdf3f425aa0d94",
    });
  } catch (e) {
    throw e;
  }
};

const update = async (id, body) => {
  const { name, price, count, desc, image_url, category, reviews } = body;
  try {
    Product.findOne({ _id: id }, (err, product) => {
      if (err) throw err;
      if (!product) return "Product not found";

      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      product.count = count ? count : product.count;
      product.desc = desc ? desc : product.desc;
      product.image_url = image_url ? image_url : product.image_url;
      product.category = category ? category : product.category;
      product.reviews = reviews ? reviews : product.reviews;
      product.save();
    });
  } catch (e) {
    throw e;
  }
};

const del = (id) => {
  try {
    Product.findOne({ _id: id }, (err, product) => {
      if (err) throw err;
      if (!product) return "No such product.";

      product.remove();
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  del,
};
