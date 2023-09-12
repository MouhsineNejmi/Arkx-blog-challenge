require("dotenv").config();

const express = require("express");
const connectDB = require("./db/db.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport");

const authRoutes = require("./routes/authenticationRoutes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "7c6243041c52a8020f63",
    cookie: { maxAge: 86400 * 1000, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Blog Application");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    connectDB(process.env.ATLAS_URL);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
