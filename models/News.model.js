const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  content: {
    type: String
  },
});

const News = model("News", newsSchema);

module.exports = News;
