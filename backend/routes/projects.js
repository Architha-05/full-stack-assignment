const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Project = require("../models/project");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const project = new Project({
      name,
      description,
      imageUrl: `/uploads/${req.file.filename}`, 
    });

    await project.save();
    res.status(201).json({ message: "Project added", project });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); 
    res.json(projects); 
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
