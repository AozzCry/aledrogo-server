const { Schema, model } = require("mongoose");

const { productSchema: product } = require("./product.model");

const userModel = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model("User", userModel);
