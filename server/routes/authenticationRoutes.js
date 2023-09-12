const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const { v4: uuidv4 } = require("uuid");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.find(username, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false);

      if (user.password != password) return done(null, false);

      return done(null, user);
    });
  })
);

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then((user) => {
      if (user) {
        res.status(201).json({
          statusCode: 201,
          message: "User created successfully",
          data: { ...user, id: uuidv4().toString() },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Error creating user" });
    });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/register" }),
  async (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username, password: password })
      .then((user) => {
        if (user) {
          res.status(200).json({
            statusCode: 200,
            message: "Post successfully",
            data: { user },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "User not found" });
      });
  }
);

module.exports = router;
