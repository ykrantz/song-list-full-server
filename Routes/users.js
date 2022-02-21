const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const { PlayList, Song, User } = require("../DL/models/indexModels");
const user = require("../BL/userLogic");

// const DEFULT_PLAYLIST_NAME = "my firts play list";

router.get("/", async (req, res) => {
  const usersList = await User.find({});
  console.log(usersList);
  res.send(usersList);
});

// register new user

router.post("/register", async (req, res) => {
  try {
    const newUser = await user.register(req.body);

    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "internal server eror" });
  }
});

// log in user:

router.post("/login", async (req, res) => {
  try {
    console.log("$$$");
    const userlogin = await user.login(req.body);
    if (userlogin.accessToken) {
      res.json({ accessToken: userlogin.accessToken });
    } else {
      return res.status(400).json({ messege: userlogin.messege });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "internal server eror" });
  }
});

module.exports = router;
