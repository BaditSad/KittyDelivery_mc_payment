var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user_id: { type: Number, required: true },
  restaurant_id: { type: Number, required: true },
  delivery_id: { type: Number, required: true },
  order_date: { type: Date, required: true },
  status: { type: String, required: true },
  total_amount: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);

