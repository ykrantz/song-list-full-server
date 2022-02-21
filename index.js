require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./DL/db").connect;
const {
  apiRoute,
  songsRoute,
  usersRoute,
  playlistRoute,
} = require("./Routes/routerIndex");

const authJWT = require("./Middleware/authJWT");
console.log("welcome");

// ***********
// Usese
// ***********

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log(MONGO_URL);

// ***********
// GET
// ***********

// use routes:
// app.use("/", (req, res) => {
//   res.send("server in air");
// });

app.use("/api", apiRoute);

app.use("/songs", songsRoute);

app.use("/users", usersRoute);
app.use("/playlist", authJWT, playlistRoute);

// ***********
// Listen
// ***********

// look fpr PORT in env. if not exsist will put 5000 in port
const port = process.env.PORT;

connectDB().then(() => {
  console.log("************************************");
  console.log("connecting sucssesfully to DB");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
