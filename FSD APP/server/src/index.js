const express = require("express");
const mongoose = require("mongoose");
const discussionRouter = require("./controller/discussionController");
require('dotenv').config()
const cros = require("cors")
const app = express();
app.use(express.json());
app.use(cros())
app.use("/discussion",discussionRouter)

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL
    );
    console.log("sucessfully connected to DB");
  } catch (err) {
    console.log("failed to connected DB");
  }
});
