const { Task } = require("../models/taskSchema");
const {catchAsync} = require('./errorController')

exports.CreateTask = catchAsync(async (req, res) => {
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
})

exports.getAllTasks = catchAsync(async (req,res) => {
  const user = req.user

  if (!user) {
    return res.status(400).json({
      "status": "failed",
      "message": "login to access this route"
    })
  }


  const tasks = await Task.find().sort({ deadline: -1 });;
  res.status(200).json({
    "status": "success",
    "length": tasks.length,
    tasks: tasks
  })
})
