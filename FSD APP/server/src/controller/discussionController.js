const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userModel = require("../model/user.model");
const Authenticaion = require("../middleware/Authentication");
const discussionModel = require("../model/discussion.model");
const Authrization = require("../middleware/Authrization")
const discussionRouter = express.Router();

discussionRouter.post("/signup", (req, res) => {
  let { email, password, role } = req.body;

  bcrypt.hash(password, 6, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("something went wrong! please try agian");
    } 
    else {
      let user = await userModel.create({ email, password: hash, role });
      res.send({msg:"Signup sucessfull",user});
    }
  });
});

discussionRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  let hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    // result == false
    if(result) {
      var token = jwt.sign({ email: email, userId: user._id }, process.env.SECRET_KEY);
      res.send({ msg: "login sucessfull", token: token, userId: user._id });
    }
    else{
      res.send('invalid credencial')

    }
  });
});

discussionRouter.get("/:userId", Authenticaion, async (req, res) => {
  let userId = req.params.userId;
  let discussion = await discussionModel.find({ userId })
  res.send(discussion);
});

discussionRouter.post("/:userId/create", Authenticaion, async (req, res) => {
  let { userId } = req.params;
  let { Question, tag } = req.body;
  let discussion = await discussionModel.create({ Question, tag, userId });
  res.send({ msg: "question created sucessfull", discussion });
});

discussionRouter.patch(
  "/:userId/edit/:questionId",
  Authenticaion,
  async (req, res) => {
    let { userId } = req.params;
    let { questionId } = req.params;
    let ques = await discussionModel.findOne({ _id: questionId });
    if (ques.userId !== userId) {
      res.send("you are not autherizted for this operation");
    }
    let update_discussion = await discussionModel.findByIdAndUpdate(
      questionId,
      req.body
    );
    res.send({ msg: "update sucessfull", update_discussion });
  }
);

discussionRouter.delete("/:userId/delete/:questionId",Authenticaion,Authrization(["teacher"]), async (req, res) => {
  let { userId } = req.params;
  let { questionId } = req.params;

  let ques = await discussionModel.findOne({ _id: questionId });
  if (ques.userId !== userId) {
    res.send("you are not authorized to do this");
  }
  let deleteques = await discussionModel.findByIdAndDelete(questionId);
  res.send({ msg: "deleted sucessfull", deleteques });
});

module.exports = discussionRouter;
