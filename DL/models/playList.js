// not in use now. maybe in futer

const mongoose = require("mongoose");

const playListSchema = new mongoose.Schema({
  playlistName: { type: String, required: true },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Song",
    },
  ],
});

const PlayList = mongoose.model("PlayList", playListSchema);
module.exports = PlayList;
