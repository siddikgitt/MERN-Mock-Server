const express = require("express");
const app = express.Router();

const User = require("../Models/list.model");
app.use("/login", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await User.findOne({ name, email, password });
    if (!user) {
      return res.status(401).send("Incorrect credential, User not Found");
    }
    res.send({
      token: `${user.id}:${user.email}:${user.password}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).send("user already exist");
    }
    let newUser = await User.create(req.body);
    res.send({
      token: `${newUser.id}:${newUser.email}:${newUser.password}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
