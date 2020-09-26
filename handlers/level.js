const Level = require("../models/Level");

exports.getLevels = async (req, res) => {
  const levels = await Level.find().sort();
  return res.json(levels);
};

exports.createLevel = async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "")
    return res.status(400).json({ errors: "Le nom est obligatoire" });
  const newLevel = await new Level({ name: req.body.name }).save();
  return res.json(newLevel);
};
exports.updateLevel = async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  } else {
    const level = await Level.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      { new: true }
    );
    return res.json(level);
  }
};
exports.deleteLevel = async (req, res) => {
  const levelDoc = await Level.findById(req.params.id);
  if (!levelDoc) return res.status(400).json({ errors: "Level not found" });
  await Level.findByIdAndRemove(req.params.id);
  return res.json({ message: `Level ${req.params.id} deleted successfully` });
};
