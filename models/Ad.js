//Done
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  img: String,
  title: { type: String, required: true, unique: true },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ad", AdSchema);
