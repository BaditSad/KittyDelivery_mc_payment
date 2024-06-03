const express = require("express");
const router = express.Router();
module.exports = router;
const Order = require("../models/order");

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({
      delivery_person_id: false,
      order_status: "en cours",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/delivery/:delivery_person_id", async (req, res) => {
  const { delivery_person_id } = req.params;
  try {
    const orders = await Order.find({ delivery_person_id: delivery_person_id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
