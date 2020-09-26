const createUser = require("../utils/createUser");
const {
  validateSignupData,
  validateLoginData,
  validateUpdatePassword,
  reduceUserDetails
} = require("../utils/validators");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { valid, errors } = await validateSignupData(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  } else {
    const newUser = await createUser(req.body);
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1y" });
    return res.json({ jwt: token, user: { ...newUser._doc, password: "" } });
  }
};

exports.login = async (req, res) => {
  const { valid, userFound, errors } = await validateLoginData(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  } else {
    const token = jwt.sign({ id: userFound._id }, SECRET, { expiresIn: "1y" });
    return res.json({ jwt: token, user: { ...userFound._doc, password: "" } });
  }
};

exports.updatePassword = async (req, res) => {
  const { valid, userFound, errors } = validateUpdatePassword(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  } else {
    const password = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(userFound._id, { password });
    return res.json({ message: "Password updated" });
  }
};

exports.getAuthUser = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "level",
    select: "name"
  });
  console.log(user);
  return res.json({ ...user, password: null });
};

exports.updateUserDetails = async (req, res) => {
  const userDetails = reduceUserDetails(req.body);
  const userUpdated = await User.findByIdAndUpdate(req.user.id, userDetails, {
    new: true
  });
  return res.json({
    _id: userUpdated._id,
    username: userUpdated.username,
    email: userUpdated.email,
    level: userUpdated.level,
    createdAt: userUpdated.createdAt
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "level",
      select: "name"
    });
  return res.json(users);
};
