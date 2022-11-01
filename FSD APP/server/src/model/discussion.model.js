const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    Question:{type:String,required:true},
    tag:{type:String,required:true},
    userId:{type:String,required:true}
})

const discussionModel = mongoose.model("discussion",discussionSchema)

module.exports = discussionModel;
