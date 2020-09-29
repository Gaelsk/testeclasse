const isEmpty = string => (string.trim() === "" ? true : false);

exports.validateCourseData = (data) => {
  const { title, description, category, level, url, author } = data;
  let errors = {};
  if (!title || isEmpty(title)) errors.title = "Champ obligatoire";
  if (!category || isEmpty(category)) errors.category = "Champ obligatoire";
  if (!level || isEmpty(level)) errors.level = "Champ obligatoire";
  if (!description || isEmpty(description))
    errors.description = "Champ obligatoire";
if (!author || isEmpty(author))
    errors.author = "Champ obligatoire";
  if (!url) errors.url = "Fichier du cours obligatoire";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors
  };
};
