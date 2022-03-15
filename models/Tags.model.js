const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
