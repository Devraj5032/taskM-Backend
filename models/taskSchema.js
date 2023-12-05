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
  }
});

exports.Task = mongoose.model("Task", taskModel);
