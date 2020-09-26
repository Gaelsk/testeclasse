const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  description: String,
  cover: String,
  format: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  commentsCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number
    }
  ],
  level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
  exercices: Array
});

module.exports = mongoose.model("Course", CourseSchema);
