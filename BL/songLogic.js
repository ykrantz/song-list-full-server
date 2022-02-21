const song = require("../DL/controllers/songController");
const playList = require("../DL/controllers/playListController");

const findUserThatLikedSong = async (songId) => {
  let songDbId = await song.findOneAndSelect({ id: songId }, "_id");
  console.log({ songDB: songDbId });

  const playlistsWithSong = await playList.findAllAndPopulateAndSelect(
    {
      songs: { $in: songDbId },
    },
    "user",
    "user playlistName"
  );

  return playlistsWithSong;
};

module.exports = { findUserThatLikedSong };
