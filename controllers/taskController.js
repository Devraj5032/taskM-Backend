const { Task } = require("../models/taskSchema");

exports.CreateTask = async (req, res) => {
  const { title, description, members, deadline } = req.body;

  const timeStr = "T00:00:00.000Z";
  const myDedLine = deadline + timeStr;

  const newTask = await Task.create({
    title,
    description,
    members,
    deadline: new Date(myDedLine),
  });

  return res.status(201).json(newTask);
};
