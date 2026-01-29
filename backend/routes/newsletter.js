const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter");

router.get("/", async (req, res) => {
  const emails = await Newsletter.find();
  res.json(emails);
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ error: "Already subscribed" });

    const subscriber = new Newsletter({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
