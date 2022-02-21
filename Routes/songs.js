const express = require("express");
const router = express.Router();
const song = require("../BL/songLogic");

// get all users that liked this song and there play list
router.get("/favorite/:songId", async (req, res) => {
  try {
    const playlistsWithSong = await song.findUserThatLikedSong(
      req.params.songId
    );

    console.log({ playlistsWithSong });
    res.json(playlistsWithSong);
  } catch (e) {
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
