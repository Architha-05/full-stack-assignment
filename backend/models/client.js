const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Client", clientSchema);
