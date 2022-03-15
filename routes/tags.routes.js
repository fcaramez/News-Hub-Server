const router = require("express").Router();
const mongoose = require("mongoose");
const Tag = require("../models/Tags.model");
const User = require("../models/User.model")

router.post("/tags", async (req, res, next) => {
  const { name, author } = req.body;

  const user = await User.findById(author);

  Tag.create({ name, author: user })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => next(err));
});

router.get("/tags", (req, res, next) => {
  Tag.find()
  .populate("author")
    .then((foundTask) => {
      res.json(foundTask);
    })
    .catch((err) => next(err));
});

router.delete("/tags/:tagId", (req, res, next) => {
  const { tagId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tagId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  Tag.findByIdAndRemove(tagId).then(() => {
    res.json({
      message: `Tag with ${tagId} was removed successfully`,
    });
  });
});

module.exports = router;
