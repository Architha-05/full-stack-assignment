const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.post("/", async (req, res) => {
  const { fullName, email, mobile, city } = req.body;
  if (!fullName || !email || !mobile || !city)
    return res.status(400).json({ error: "All fields required" });

  const contact = new Contact({ fullName, email, mobile, city });
  await contact.save();
  res.status(201).json({ message: "Contact saved", contact });
});

module.exports = router;
