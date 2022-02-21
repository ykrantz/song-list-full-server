const express = require("express");
const router = express.Router();

const user = require("../BL/userLogic");

// register new user

router.post("/register", async (req, res) => {
  try {
    const newUser = await user.register(req.body);
    if (newUser.username) {
      res.json(newUser);
    } else {
      console.log({ message: newUser.messege });
      res.status(403).json({ message: newUser.messege });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "internal server eror" });
  }
});

// log in user:

router.post("/login", async (req, res) => {
  try {
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
