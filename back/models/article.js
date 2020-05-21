const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: "string",
  },

  content: {
    type: "string",
  },

  image: {
    type: "string",
  },

  artistePseudo: {
    type: "string",
  },

  artisteName: {
    type: "string",
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Article", articleSchema);
