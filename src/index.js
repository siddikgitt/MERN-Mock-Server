const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connect = require("../Connect/Connect");
const req = require("express/lib/request");
const jobRouter = require("../Controller/job.router");
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
const server = express();
server.use(express.json());
server.use(cors());

server.get("/", async (req, res) => {
  res.status(200).send("Hello Welcome to my server");
});

//JOB ROUTER
server.use("/job", jobRouter);

server.listen(PORT, async () => {
  await connect();
  console.log(`Database Connected and server listening on port ${PORT}`);
});
