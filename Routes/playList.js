const express = require("express");
const router = express.Router();
const { PlayList, Song } = require("../DL/models/indexModels");

// get songs of playlist of a user:

router.get("/playlist/:playlistName", async (req, res) => {
  try {
    console.log("%%%%");
    console.log("!!!!");
    const playlistName = req.params.playlistName;
    const user = req.user;
    const playlist = await PlayList.findOne({
      user: user._id,
      playlistName: playlistName,
    }).populate("songs");

    res.json(playlist?.songs ? playlist.songs : []);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

//get all playlist for user
router.get("/userplaylists", async (req, res) => {
  try {
    console.log("$$$");
    const user = req.user;
    const playlists = await PlayList.find({
      user: user._id,
    });
    res.json(playlists);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

//add song to playlist of user

router.put("/", async (req, res) => {
  try {
    const playlistName = req.body.playlistName;
    const song = req.body.song;
    const user = req.user;
    let songId = await Song.findOne({ id: song.id }).select("_id");
    if (!songId) {
      const newSong = await new Song({
        ...song,
      }).save();
      console.log("song was creates", newSong);
      songId = newSong._id;
    }
    const exsitSongInPlayList = await PlayList.findOne({
      user: user._id,
      playlistName: playlistName,
      songs: { $in: songId },
    });
    if (exsitSongInPlayList) {
      res.status(403).json({ message: "song already exsist in playlist" });
    }

    const updatedPlaylist = await PlayList.findOneAndUpdate(
      {
        user: user._id,
        playlistName: playlistName,
      },
      { $push: { songs: songId } },
      { new: true }
    );
    console.log("updated playlist", updatedPlaylist);
    res.json(updatedPlaylist);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

//  remove song from playlist

router.put("/deletesong", async (req, res) => {
  try {
    const playlistName = req.body.playlistName;
    // gets song mongo id
    const songId = req.body.songId;
    const user = req.user;

    console.log({ playlistName });
    console.log({ songId });
    console.log("user._id", user._id);

    const updatedPlaylist = await PlayList.findOneAndUpdate(
      { playlistName: playlistName, songs: songId, user: user._id },
      { $pull: { songs: songId } },

      { new: true }
    );
    console.log({ updatedPlaylist });

    if (updatedPlaylist) {
      console.log("###");
      res.json(updatedPlaylist);
    } else {
      res.status(403).json({ message: "no song was found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

// create new playlist for user:

router.post("/", async (req, res) => {
  try {
    console.log("###");
    const playlistName = req.body.playlistName;
    const userID = req.user._id;
    console.log("body", req.body);
    console.log("playlistName", playlistName, userID);

    const playlist = await PlayList.findOne({
      user: userID,
      playlistName: playlistName,
    });

    if (!playlist) {
      console.log("no playlist");
      const newPlaylist = await new PlayList({
        playlistName: playlistName,
        user: userID,
      }).save();
      console.log("playlist was creates", newPlaylist);
      res.json(newPlaylist);
    } else {
      res.status(403).json({ message: "playlist already exsist" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

router.delete("/deleteplaylist/:playlistName", async (req, res) => {
  try {
    const playlistName = req.params.playlistName;
    const user = req.user;
    const deletedPlaylist = await PlayList.deleteOne({
      user: user._id,
      playlistName: playlistName,
    });
    console.log("play list deleted");
    console.log({ deletedPlaylist });
    res.json(deletedPlaylist);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
