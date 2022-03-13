const router = require("express").Router();
const mongoose = require("mongoose");
const News = require("../models/News.model");
const User = require("../models/User.model");

router.get("/news", (req, res, next) => {
  News.find()
    .populate("author")
    .then((foundNews) => {
      res.json(foundNews);
    })
    .catch((err) => next(err));
});

router.post("/news", (req, res, next) => {
  const { title, author, tags, image, content } = req.body;
  const user = req.session.user;

  News.create({ title, author, tags, author: user._id, image, content })
    .then((createdNews) => {
      res.json(createdNews);
    })
    .catch((err) => next(err));
});

router.put("/news/:newsId", (req, res, next) => {
  const { newsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  News.findByIdAndUpdate(newsId, req.body)
    .then((updatedNews) => {
      res.json(updatedNews);
    })
    .catch((err) => next(err));
});

router.delete("/news/:newsId", (req, res, next) => {
  const { newsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(newsId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  News.findByIdAndRemove(newsId)
    .then(() =>
      res.json({
        message: `News with ${newsId} was removed successfully`,
      })
    )
    .catch((err) => next(err));
});

module.exports = router;
