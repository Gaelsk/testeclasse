const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({ error: "Le nom ne doit pas être vide" });
  } else {
    const category = await new Category({
      name: req.body.name
    }).save();
    return res.json(category);
  }
};
exports.getCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return res.json(categories);
};
exports.updateCategory = async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({ error: "Le nom ne doit pas être vide" });
  } else {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      { new: true }
    );
    return res.json(category);
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryDoc = await Category.findById(req.params.id);
  if (!categoryDoc)
    return res.status(400).json({ error: "Category not found" });
  await Category.findByIdAndRemove(req.params.id);
  return res.json({ message: "Category deleted successfully" });
};
