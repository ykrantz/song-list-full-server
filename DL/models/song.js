const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // artist: { type: String, required: true },
  artist: { type: String },
  src: { type: String, required: true },
  user: { type: String },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  provider: {
    type: String,
    // , required: true
  },
  img: { type: String },
  id: { type: String },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
