const user = require("../DL/controllers/userController");
const playList = require("../DL/controllers/playListController");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DEFULT_PLAYLIST_NAME = "my firts play list";

const register = async (userDetails) => {
  console.log("%%%");
  const userExists = await user.findOne({ username: userDetails.username });
  console.log({ userExists });
  if (userExists) {
    return { messege: "user already exsists" };
  }
  const hashedPassword = await bycrypt.hash(userDetails.password, 10);

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
  const newPlaylist = await playList.create({
    playlistName: DEFULT_PLAYLIST_NAME,
    user: newUser._id,
  });

  console.log("defult playlist was created", newPlaylist);

  return {
    username: newUser.username,
    accessToken: accessToken,
  };
};

const login = async (userDetails) => {
  const userDb = await user.findOne({ username: userDetails.username });
  if (!userDb) {
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
    return { messege: "Invalid credentials" };
  }
};

module.exports = { register, login };
