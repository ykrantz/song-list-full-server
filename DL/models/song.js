const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // artist: { type: String, required: true },
  id: { type: String },
  img: { type: String },
  src: { type: String, required: true },
  provider: {
    type: String,
    // , required: true
  },
  artist: { type: String },
  // user: { type: String },
  // createdBy: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "User",
  // },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
