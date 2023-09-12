const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
