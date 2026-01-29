const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const projectRoutes = require("./routes/projects");
const clientRoutes = require("./routes/clients");
const contactRoutes = require("./routes/contacts");
const newsletterRoutes = require("./routes/newsletter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const path = require("path");
// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/flipr")
  .then(() => console.log("MongoDB connected (local)"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
