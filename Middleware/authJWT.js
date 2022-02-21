// atorization function
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log("bode1", req.body);
  // console.log("hed1", req.headers);
  // console.log("authorization", authorization);

  if (authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const user = jwt.verify(token, process.env.TOKEN_SECRET, (eror, user) => {
      if (eror) {
        console.log(eror);
        console.log("eror token");

        return res.sendStatus(403).json({ message: "bad token" });
      }
      req.user = user;
      console.log("good token");

      next();
    });
  } else {
    console.log("no token");
    res.sendStatus(401);
  }
};

module.exports = authJWT;
