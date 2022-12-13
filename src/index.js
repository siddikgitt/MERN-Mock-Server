const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/user.model");
const cors = require("cors");
const connect = require("../Connect/Connect");
const req = require("express/lib/request");
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
const server = express();
server.use(express.json());
server.use(cors());

server.get("/", async (req, res) => {
  res.status(200).send("Hello Welcome to my server");
});
server.post("/login", async (req, res) => {
  //   let user = await User.find();
  //   res.status(200).send({ message: "successfully get", data: user });
  let { name, email, password } = req.body;
  try {
    let user = await User.findOne({ name, email, password });
    if (!user) {
      return res.status(401).send("Incorrect credential, User not Found");
    }
    let timestamp = new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});
    res.status(200).send({
      token: `${user.id}:${user.email}:${timestamp}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

server.get("/emi", async (req, res) => {
  let { amount, interest, tenure } = req.body;
  if (interest == Number(interest)) {

    let r = interest / 12 / 100;
    let emi = Number((amount * r * ((1 + r) ** tenure) / ((1 + r) ** tenure - 1)).toFixed(2));
    let payableInterest = Number(((emi*tenure)-amount).toFixed());
    let total = Number((emi*tenure).toFixed(2));
    return res.status(200).send({emi: emi, interest: payableInterest, total: total});
  }
  return res.status(401).send("Give valid input")
});

server.get("/profile", async(req, res) => {
    let {id} = req.body;
    if(id){
        let user = await User.findById(id);
        return res.status(200).send(user);
    }
    return res.send("Give ID")
})

server.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).send("user already exist");
    }
    let newUser = await User.create(req.body);
    res.send({
      msg: `User created successfully`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

server.listen(PORT, async () => {
  await connect();
  console.log(`Database Connected and server listening on port ${PORT}`);
});
