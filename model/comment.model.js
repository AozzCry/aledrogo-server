const { Schema } = require("mongoose");

const commentSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  userName: String,
});

module.exports = {
  commentSchema,
};
