const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = async () => {
  try {
    return await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.log("EROR:", err);
          return;
        }
        console.log(
          "MongoDB Connection-- Ready state is:",
          mongoose.connection.readyState
        );
      }
    );
  } catch (e) {
    console.log("eror connection mongoose", e);
  }
};
