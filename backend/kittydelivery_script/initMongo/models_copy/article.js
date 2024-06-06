const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  menu_id: { type: Number, required: true },
  article_name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
