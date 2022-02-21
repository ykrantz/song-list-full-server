const user = require("../DL/controllers/userController");
// TODO: take out play list to controlers
const PlayList = require("../DL/models/playList");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DEFULT_PLAYLIST_NAME = "my firts play list";

const register = async (userDetails) => {
  const hashedPassword = await bycrypt.hash(userDetails.password, 10);
  //   const newUser = await new User({
  //     username: req.body.username,
  //     password: hashedPassword,
  //   }).save();
  const newUser = await user.createUser({
    username: userDetails.username,
    password: hashedPassword,
  });

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

  return {
    username: newUser.username,
    // password: newUser.password,
    accessToken: accessToken,
  };
};

const login = async (userDetails) => {
  // console.log(req.body.username);
  const userDb = await user.findOne({ username: userDetails.username });
  //   console.log(userDb);
  if (!userDb) {
    // return res.status(400).json({ messege: "Invalid credentials" });
    return { messege: "Invalid credentials" };
  }

  const match = await bycrypt.compare(userDetails.password, userDb.password);

  if (match) {
    const accessToken = jwt.sign(
      JSON.stringify(userDb),
      process.env.TOKEN_SECRET
    );
    console.log("user athorised");
    return { accessToken: accessToken };
  } else {
    // return res.status(400).json({ messege: "Invalid credentials" });
    return { messege: "Invalid credentials" };
  }
};

module.exports = { register, login };
