var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MenuSchema = new Schema({
  restaurant_id: { type: Number, required: true },
  menu_name: { type: String, required: true },
  articles: { type: String, required: true },
});

module.exports = mongoose.model("Menu", MenuSchema);
