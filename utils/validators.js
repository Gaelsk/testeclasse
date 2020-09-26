const User = require("../models/User");
const bcrypt = require("bcryptjs");
const isEmpty = string => (string.trim() === "" ? true : false);
const isEmail = email => (email.match(/.+@.+\..+/) ? true : false);

exports.validateSignupData = async user => {
  const { username, email, password, level } = user;
  let errors = {};
  if (!username || isEmpty(username)) errors.username = "Nom obligatoire";
  if (!level || isEmpty(level)) errors.level = "Selectionner votre classe";
  if (!email || isEmpty(email)) {
    errors.email = "Champ obligatoire";
  } else if (!isEmail(email)) {
    errors.email = "Email invalide";
  }
  if (!password || isEmpty(password)) errors.password = "Champ obligatoire";
  if (password.length < 6)
    errors.password = "Doit contenir au moins 6 caractères";

  const userFoundWithEmail = await User.findOne({ email });
  if (userFoundWithEmail) errors.email = "Email déjà utilisé";

  const userFoundWithUsername = await User.findOne({ username });
  if (userFoundWithUsername) errors.username = "Nom déjà utilisé";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors
  };
};

exports.validateLoginData = async user => {
  const { email, password } = user;
  let errors = {};
  if (isEmpty(email)) errors.email = "Champ obligatoire";
  if (isEmpty(password)) errors.password = "Champ obligatoire";

  const userFound = await User.findOne({ email });
  if (!isEmpty(email) && !userFound) {
    errors.email = "Email inconnu";
  }
  if (userFound) {
    const validPassword = await bcrypt.compare(password, userFound.password);
    if (!validPassword) errors.password = "Mot de passe incorrecte";
  }

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    userFound,
    errors
  };
};

exports.validateCourseData = (data) => {
  const { title, description, category, level, url } = data;
  let errors = {};
  if (!title || isEmpty(title)) errors.title = "Champ obligatoire";
  if (!category || isEmpty(category)) errors.category = "Champ obligatoire";
  if (!level || isEmpty(level)) errors.level = "Champ obligatoire";
  if (!description || isEmpty(description))
    errors.description = "Champ obligatoire";
  if (!url) errors.url = "Fichier du cours obligatoire";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors
  };
};

exports.reduceUserDetails = data => {
  const userDetails = {};
  if (!isEmpty(data.username)) userDetails.username = data.username;
  if (!isEmpty(data.level)) userDetails.level = data.level;

  return userDetails;
};

exports.validateUpdatePassword = async user => {
  const { email, password } = user;
  let errors = {};
  if (isEmpty(email)) errors.email = "Champ obligatoire";
  if (isEmpty(password)) errors.password = "Champ obligatoire";

  const userFound = await User.findOne({ email });
  if (!userFound) errors.email = "No user with that email";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    userFound,
    errors
  };
};
