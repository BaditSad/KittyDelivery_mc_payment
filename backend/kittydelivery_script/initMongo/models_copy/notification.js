var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  user_id: { type: Number, required: true },
});

module.exports = mongoose.model("Notification", NotificationSchema);
