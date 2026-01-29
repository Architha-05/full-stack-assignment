const express = require("express");
const router = express.Router();
const multer = require("multer");
const Client = require("../models/client");


const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/"); },
    filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname); }
});
const upload = multer({ storage });


router.get("/", async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

// POST add new client
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    if (!name || !designation || !description)
      return res.status(400).json({ error: "All fields are required" });

    if (!req.file)
      return res.status(400).json({ error: "Image file is required" });

    const image = req.file.path;

    const client = new Client({ name, designation, description, imageUrl: image });
    await client.save();

    res.status(201).json(client);
  } catch (err) {
    console.error("Error adding client:", err);
    res.status(500).json({ error: "Server error while adding client" });
  }
});


module.exports = router;
