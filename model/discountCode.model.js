const { Schema, model } = require("mongoose");

const discountCode = new Schema({
  code: { type: String, require: true },
  expiryDate: { type: Date, default: Date.now(), expires: 30 * 1000 },
  discountValue: Number,
});

module.exports = model("Discount", discountCode);
