const express = require("express");
// const Song = require("../models/song");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const authJWT = require("../Middleware/authJWT");
const mongoose = require("mongoose");
// const { PlayList } = require("../models/modelIndex").models;
const { PlayList, Song, User } = require("../DL/models/indexModels");

// get all users that liked this song and there play list
router.get("/favorite/:songId", async (req, res) => {
  try {
    const songId = req.params.songId;
    let songIdDB = await Song.findOne({ id: songId }).select("_id");

    const playlistsWithSong = await PlayList.find({
      songs: { $in: songIdDB },
    })
      .populate("user")
      .select("user playlistName ");

    console.log({ playlistsWithSong });
    res.json(playlistsWithSong);
  } catch (e) {
    res.status(500).json({ message: "internal server eror" });
  }
});

// get song by id

router.get("/id/:id", async (req, res) => {
  const songDetails = await Song.findOne({ id: req.params.id });
  console.log(songDetails);
  // const songList = await ans.json();
  console.log(songDetails);
  res.send(songDetails);
});

// add song

router.post("/", authJWT, async (req, res) => {
  console.log("bode", req.body);
  console.log("hed", req.headers);
  const createdBy = await User.findOne({ username: req.user.username });
  console.log(createdBy);
  const newSong = await new Song({
    ...req.body,
    createdBy: createdBy._id,
  }).save();
  console.log(newSong);
  res.send(newSong);
});

module.exports = router;
