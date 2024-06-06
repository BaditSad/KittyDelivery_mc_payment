
const express = require("express");
const router = express.Router();
module.exports = router;
const Notification = require("../models/notification");

router.get("/notifications", async (req, res) => {
  try {
    const notification = await Notification.find({});
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

