const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  deadline: {
    type: Date,
    required: true
  },
  dateCreated : {
    type: Date,
    default: Date.now(),
  }
});

exports.Task = mongoose.model("Task", taskModel);
