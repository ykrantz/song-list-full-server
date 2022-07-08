const express = require("express");
const router = express.Router();

const apiSongs = require("../BL/apiSongsLogic");
// const axios = require("axios").default;

router.get("/search/:value", async (req, res) => {
  try {
    const searchValue = req.params.value;
    const ans = await apiSongs.searchFromApi(searchValue);
    if (!ans?.message) {
      console.log(ans);
      res.json(ans);
    } else {
      res.status(ans.status).json(ans);
    }
  } catch (e) {
    console.log(e);
    if (e?.code === 429) {
      res.status(e.code).json({
        message: e.message + " of all users. We are sorry. please try later",
      });
    } else {
      res.status(500).json({ message: "internal server eror" });
    }
  }
});

module.exports = router;
