const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connect = require("../Connect/Connect");
const req = require("express/lib/request");
const userRouter = require("../Controller/user.router");
const randomRouter = require("../Controller/random.router");
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
const server = express();
server.use(express.json());
server.use(cors());

server.get("/", async (req, res) => {
  res.status(200).send("Hello Welcome to my server");
});

//USER ROUTER
server.use("/user", userRouter);

//RANDOM WORD ROUTER
server.use("/random", randomRouter);

server.listen(PORT, async () => {
  await connect();
  console.log(`Database Connected and server listening on port ${PORT}`);
});
