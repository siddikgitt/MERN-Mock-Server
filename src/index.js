const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connect = require("../Connect/Connect");
const req = require("express/lib/request");
const List = require("../Models/list.model");
const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", true);
const server = express();
server.use(express.json());
server.use(cors());

server.get("/", async (req, res) => {
  res.status(200).send("Hello Welcome to my server");
});

// GET LIST
server.get("/list", async (req, res) => {
  try {
    const data = await List.find();
    res.send({ data: data });
  } catch (error) {
    res.status(501).send(error.message);
  }
});

// LIST ADD
server.post("/list", async (req, res) => {
  let dateandtimestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata"
  });
  let list = { ...req.body, dateandtimestamp: dateandtimestamp };
  console.log(list);
  try {
    const data = await List.create(list);
    res.send({ message: "List added successfully", list });
  } catch (error) {
    res.status(501).send(error.message);
  }
});

// LIST DELETE
server.delete("/list/:id", async (req, res) => {
  let id = req.params.id;
  try {
    id = id.toString();
    let data = await List.findByIdAndDelete(id);
    if (!data) {
      res.status(401).send("data not found");
    } else {
      res.send("List Deleted Successfully");
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

server.listen(PORT, async () => {
  await connect();
  console.log(`Database Connected and server listening on port ${PORT}`);
});
