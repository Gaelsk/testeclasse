//Done
const Comment = require("../models/Comment");
const Course = require("../models/Course");

exports.createComment = async (req, res) => {
  const CourseDoc = await Course.findById(req.params.id);
  if (!req.body.text || req.body.text.trim() === "") {
    return res.status(400).json({ comment: "Must not be empty" });
  } else {
    const newComment = await new Comment({
      user: req.user.id,
      course: req.params.id,
      text: req.body.text
    }).save();
    const commentsCount = CourseDoc.commentsCount + 1;
    await Course.findByIdAndUpdate(
      req.params.id,
      { commentsCount },
      { new: true }
    );

    const comment = await Comment.findById(newComment._id).populate({
      path: "user",
      select: "username"
    });
    return res.json(comment);
  }
};

exports.deleteComment = async (req, res) => {
  const commentDoc = await Comment.findById(req.params.id);
  const CourseDoc = await Course.findById(commentDoc.course);
  if (!commentDoc) {
    return res.status(404).json({ error: "Comment not found" });
  } else if (commentDoc.user != req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    await Comment.findByIdAndRemove(req.params.id);
    const commentsCount = CourseDoc.commentsCount - 1;
    await Course.findByIdAndUpdate(
      commentDoc.course,
      { commentsCount },
      { new: true }
    );
    return res.json({
      message: `Comment ${commentDoc._id} deleted successfully`
    });
  }
};
