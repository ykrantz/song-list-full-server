const user = require("../DL/controllers/userController");
const playList = require("../DL/controllers/playListController");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DEFULT_PLAYLIST_NAME = "my firts play list";

const register = async (userDetails) => {
  const isUserDetailsEror = checkErorUserDetails(userDetails);
  console.log({ isUserDetailsEror });
  if (isUserDetailsEror) {
    return isUserDetailsEror;
  }
  const userExists = await user.findOne({
    username: userDetails.username,
  });
  if (userExists) {
    return { message: "user already exsists", status: 403 };
  }
  const hashedPassword = await bycrypt.hash(userDetails.password, 10);

  const newUser = await user.create({
    username: userDetails.username,
    password: hashedPassword,
  });

  const userToken = { _id: newUser._id, username: newUser.username };
  const accessToken = await jwt.sign(
    JSON.stringify(userToken),
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
  const isUserDetailsEror = checkErorUserDetails(userDetails);
  console.log({ isUserDetailsEror });
  if (isUserDetailsEror) {
    return isUserDetailsEror;
  }

  const userDb = await user.findOneAndSelect(
    {
      username: userDetails.username,
    },
    "+password"
  );
  if (!userDb) {
    return { status: 401, message: "Invalid credentials" };
  }

  const match = await bycrypt.compare(userDetails.password, userDb.password);

  if (match) {
    const userToken = { _id: userDb._id, username: userDb.username };
    const accessToken = jwt.sign(
      JSON.stringify(userToken),
      process.env.TOKEN_SECRET
    );
    console.log("user athorised");
    return { accessToken: accessToken };
  } else {
    return { status: 401, message: "Invalid credentials" };
  }
};

const checkErorUserDetails = (userDetails) => {
  if (!userDetails.username || !userDetails.password) {
    return { status: 400, message: "please enter user name and password" };
  } else if (
    userDetails.username.length < 1 ||
    userDetails.password.length < 3
  ) {
    return {
      status: 400,
      message:
        "please enter user name more than 2 letters , and password more than 4 letters",
    };
  } else if (
    userDetails.username.length >= 15 ||
    userDetails.password.length >= 30
  ) {
    return {
      status: 400,
      message:
        "please enter user name less than 15 letters , and password less than 30 letters",
    };
  }

  return false;
};

module.exports = { register, login };
