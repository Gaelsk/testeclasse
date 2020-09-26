const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BanqueSchema = new Schema({
  name: String,
  url: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Banque", BanqueSchema);
