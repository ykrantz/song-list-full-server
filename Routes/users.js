const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const { PlayList, Song, User } = require("../DL/models/indexModels");

const DEFULT_PLAYLIST_NAME = "my firts play list";

router.get("/", async (req, res) => {
  const usersList = await User.find({});
  console.log(usersList);
  res.send(usersList);
});

// register new user

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bycrypt.hash(req.body.password, 10);
    const newUser = await new User({
      username: req.body.username,
      password: hashedPassword,
    }).save();
    const accessToken = await jwt.sign(
      JSON.stringify(newUser),
      process.env.TOKEN_SECRET
    );

    console.log("new user was saved");

    // cerate defulte playlist
    const newPlaylist = await new PlayList({
      playlistName: DEFULT_PLAYLIST_NAME,
      user: newUser._id,
    }).save();
    console.log("defult playlist was created", newPlaylist);

    res.send({
      username: newUser.username,
      // password: newUser.password,
      accessToken: accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "internal server eror" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.username);
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      return res.status(400).json({ messege: "Invalid credentials" });
    }

    const match = await bycrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        JSON.stringify(user),
        process.env.TOKEN_SECRET
      );
      console.log("user athorised");
      res.send({ accessToken: accessToken });
    } else {
      return res.status(400).json({ messege: "Invalid credentials" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "internal server eror" });
  }
});

module.exports = router;
