const express = require("express");
const User = require("../Models/random.model");
const userRouter = express.Router();
userRouter.post("/", async (req, res) => {
    console.log(req.body);
  try {
    const data = await User.create(req.body);
    return res.status(200).send({ message: "Data added", data: data });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
});

userRouter.get("/", async (req, res) => {
  try {

    let users = await User.find().sort({score: -1})
    
    return res.status(200).send(users)

  } catch (e) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
