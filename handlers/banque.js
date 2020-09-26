const Banque = require("../models/Banque");
exports.createBanque = async (req, res) => {
  const { category, level, url, name } = req.body;
  if (!category || !level || !url) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  } else {
    const banque = await new Banque({
      name,
      url,
      level,
      category
    }).save();
    const response = await Banque.findById(banque._id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "level", select: "name" });

    return res.json(response);
  }
};
exports.getBanques = async (req, res) => {
  const { category, level } = req.query;
  const params = {};
  if (category) params.category = category;
  if (level) params.level = level;
  const banques = await Banque.find(params)
    .sort({ createdAt: -1 })
    .populate({ path: "category", select: "name" })
    .populate({ path: "level", select: "name" });
  return res.json(banques);
};
exports.deleteBanque = async (req, res) => {
  const banqueDoc = await Banque.findById(req.params.id);
  if (!banqueDoc) return res.status(400).json({ error: "Category not found" });
  await Banque.findByIdAndRemove(req.params.id);
  return res.json({ message: "Banque deleted successfully" });
};
