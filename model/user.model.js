const { Schema, model } = require("mongoose");

const userModel = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  wishlist: [String],
  avatar: String,
});

module.exports = model("User", userModel);
