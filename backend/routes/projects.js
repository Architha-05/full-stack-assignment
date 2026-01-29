const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Project = require("../models/project");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const project = new Project({
      name,
      description,
      imageUrl: `/uploads/${req.file.filename}`, // <-- use forward slashes
    });

    await project.save();
    res.status(201).json({ message: "Project added", project });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(400).json({ error: err.message });
  }
});
// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // fetch all projects from MongoDB
    res.json(projects); // send JSON to frontend
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
