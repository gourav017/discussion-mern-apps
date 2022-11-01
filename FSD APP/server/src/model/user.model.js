const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
    default: "student",
  },
});

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;

