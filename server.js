const express = require("express");
const app = express();
//const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const { signup, login, getUsers, getAuthUser, updateUserDetails } = require("./handlers/user");
const {
  getCourses,
  getCourseByTitle,
  addCourse,
  deleteCourse,
  addExercices,
  deleteExercice,
  downloadCourse,
  rateCourse,
  uploader
} = require("./handlers/course");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("./handlers/category");
const { createComment, deleteComment } = require("./handlers/comment");
const {
  getLevels,
  createLevel,
  updateLevel,
  deleteLevel
} = require("./handlers/level");
const { createBanque, getBanques, deleteBanque } = require("./handlers/banque");
const { createAd, getAds, getAd, deleteAd } = require("./handlers/ad");

const auth = require("./utils/auth");
const admin = require("./utils/admin")
//middlewares
//app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//app.use("/uploads", express.static("uploads"));

//DB config
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI_PROD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));
//Routes user
app
  .post("/signup", signup)
  .post("/login", login)
  .get("/user", auth, getAuthUser)
  .post('/user', auth, updateUserDetails)

  .get("/users", admin, getUsers);
//Routes courses
app
  .get("/courses", getCourses)
  .post("/courses", admin, addCourse)
  .get("/courses/:title", getCourseByTitle)
  .delete("/courses/:id", admin, deleteCourse)
  .post("/courses/:id/comments", auth, createComment)
  .delete("/comments/:id", auth, deleteComment)
  .get("/courses/:id/download", auth, downloadCourse)
  .post("/courses/:id/rate", auth, rateCourse)
  //exercices
  .post("/courses/:id/exercices", admin, addExercices)
  .delete("/courses/:id/exercices/:index", admin, deleteExercice)
  //category
  .get("/categories", getCategories)
  .post("/categories", admin, createCategory)
  .put("/categories/:id", admin, updateCategory)
  .delete("/categories/:id", admin, deleteCategory)
  //level
  .get("/levels", getLevels)
  .post("/levels", admin, createLevel)
  .put("/levels/:id", admin, updateLevel)
  .delete("/levels/:id", admin, deleteLevel)
  //banques
  .get("/banques", getBanques)
  .post("/banques", admin, createBanque)
  .delete("/banques/:id", admin, deleteBanque)
  //ads
  .get("/ad", getAd)
  .get("/ads", getAds)
  .post("/ads", admin, createAd)
  .delete("/ads/:id", admin, deleteAd);

app.post("/upload", uploader);
app.use(express.static(path.join(__dirname, 'build')))
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
