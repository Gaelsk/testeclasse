const Ad = require("../models/Ad");
exports.createAd = async (req, res) => {
  const {title, content, img} = req.body;
  if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "Le title est obligatoire" });
    } else {
      const obj = { title };
      if (content) obj.content = content;
      if (img) obj.img = path.basename(img);
      const ad = await new Ad(obj).save();
      return res.json(ad);
    }
};
exports.getAds = async (req, res) => {
  const ads = await Ad.find().sort({ createdAt: -1 });
  return res.json(ads);
};

exports.getAd = async (req, res) => {
  const ad = await Ad.find()
    .sort({ createAd: -1 })
    .limit(1);
  return res.json(ad[0]);
};

exports.deleteAd = async (req, res) => {
  const addDoc = await Ad.findById(req.params.id);
  if (!addDoc) return res.status(400).json({ error: "Ad not found" });
  await Ad.findByIdAndRemove(req.params.id);
  return res.json({ message: "Ad deleted successfully" });
};
