const express = require("express");
const router = express.Router();

const apiSongs = require("../BL/apiSongsLogic");
// const axios = require("axios").default;

router.get("/search/:value", async (req, res) => {
  try {
    const searchValue = req.params.value;

    const ans = await apiSongs.searchFromApi(searchValue);
    res.json(ans);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server eror" });
  }
});

module.exports = router;
