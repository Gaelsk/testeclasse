const Course = require("../models/Course");
const Comment = require("../models/Comment");
const { validateCourseData } = require("../utils/validators");
const path = require("path");
const s3 = require("../aws");
const fs = require("fs");

exports.getCourses = async (req, res) => {
  const { title, category, limit, level } = req.query;
  const params = {};
  if (title) params.title = new RegExp(title, "gi");
  if (category) params.category = category;
  if (level) params.level = level;
  const courses = await Course.find(params)
    .sort({ createdAt: -1 })
    .populate({ path: "category", select: "name" })
    .populate({ path: "level", select: "name" })
    .limit(parseInt(limit));
  courses.map(course => {
    const total_ratings =
      course.ratings.length > 0 &&
      course.ratings.map(({ rating }) => rating).reduce((a, b) => a + b);
    const rating = total_ratings / course.ratings.length;
    const courseData = { ...course._doc, rating };
    return courseData;
  });
  return res.json(courses);
};

exports.getCourseByTitle = async (req, res) => {
  let CourseData = {};
  let CourseDoc = await Course.findOne({
    title: new RegExp(req.params.title, "gi")
  }).populate({
    path: "category",
    select: "name"
  });
  if (!CourseDoc) {
    return res.status(404).json({ error: "Course not found" });
  }
  const total_ratings =
    CourseDoc.ratings.length > 0 &&
    CourseDoc.ratings.map(({ rating }) => rating).reduce((a, b) => a + b);
  const rating = total_ratings / CourseDoc.ratings.length;
  CourseData = { ...CourseDoc._doc, rating };
  CourseData.comments = await Comment.find({ course: CourseDoc._id })
    .select("-course")
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "username createdAt" });
  return res.json(CourseData);
};
exports.addCourse = async (req, res) => {
  const { title, description, category, level, author, url, cover } = req.body;
    const { valid, errors } = validateCourseData(req.body);
    if (!valid) return res.status(403).json(errors);
    const getCourseFormat = require("../utils/getCourseFormat")
    const format = getCourseFormat(url);
    const newCourse = await new Course({
      title,
      description,
      category,
      level,
      author,
      format,
      url,
      cover
    }).save();
    const course = await Course.findById(newCourse._id)
      .populate({ path: "level" })
      .populate({ path: "category" });
    return res.json(course);
};

exports.deleteCourse = async (req, res) => {
  const CourseDoc = await Course.findById(req.params.id);
  if (!CourseDoc) return res.status(404).json({ error: "Course not found" });
  await Course.findByIdAndRemove(req.params.id);
  return res.json({ message: "Course deleted successfully" });
};

exports.addExercices = async (req, res) => {
    const CourseDoc = await Course.findById(req.params.id)
    if(req.body.url) {
    const exercices = await Course.findByIdAndUpdate(req.params.id, {
      exercices: [...CourseDoc.exercices, {name: req.body.name, url: req.body.url}]
    });
    return res.json(exercices);
    }
};

exports.deleteExercice = async (req, res) => {
const CourseDoc = await Course.findById(req.params.id);    
  CourseDoc.exercices.splice(req.params.index, 1);
    await CourseDoc.save();
    return res.json({success: true, message: "Exercice deleted successfully"});
};

exports.downloadCourse = async (req, res) => {
  const CourseDoc = await Course.findById(req.params.id);
  await Course.findByIdAndUpdate(req.params.id, {
    downloadCount: CourseDoc.downloadCount + 1
  });
  return res.json({ message: "Course downloaded successfully" });
};

exports.rateCourse = async (req, res) => {
  const CourseDoc = await Course.findById(req.params.id);
  const data = { user: req.user.id, rating: req.body.rating };
  const index = CourseDoc.ratings.findIndex(({ user }) => user == data.user);
  if (index === -1) {
    CourseDoc.ratings.push(data);
    await CourseDoc.save();
    return res.json({ message: "Course rated successfully" });
  } else {
    CourseDoc.ratings.splice(index, 1, data);
    await CourseDoc.save();
    return res.json({ message: "Course rated successfully" });
  }
};

exports.uploader = (req, res) => {
  const formidable = require("formidable");
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 500 * 1024 * 1024;
  form.parse(req, async (err, fields, files) => {
    if (err) throw err;
    const buffer = fs.readFileSync(files.file.path);
    //const readStream = fs.createReadStream(files.file.path);
    console.log(buffer);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `courses/${files.file.name}`, // File name you want to save as in S3
      Body: buffer//readStream
    };
    s3.putObject(params, function(err, data) {
      //readStream.destroy();
      if (err) {
        console.log(err)
      }
      console.log(`File uploaded successfully. ${data}`);
      return res.json(data);
    });
  });
};
