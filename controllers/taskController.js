const { Task } = require("../models/taskSchema");
const { catchAsync } = require('./errorController')

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

exports.getAllTasks = catchAsync(async (req, res) => {
  const user = req.user

  if (!user) {
    return res.status(400).json({
      "status": "failed",
      "message": "login to access this route"
    })
  }

  // Sorting

  // Sort by deadline
  const { deadline } = req.query
  if (deadline) {
    const tasks = await Task.find().sort({ deadline: deadline == 1 ? 1 : -1 });
    res.status(200).json({
      "status": "success",
      "length": tasks.length,
      tasks: tasks
    })
  }

  // Sort by date created
  const { dateCreated } = req.query
  if (deadline) {
    const tasks = await Task.find().sort({ dateCreated: dateCreated == 1 ? 1 : -1 });
    res.status(200).json({
      "status": "success",
      "length": tasks.length,
      tasks: tasks
    })
  }


  const tasks = await Task.find();
  res.status(200).json({
    "status": "success",
    "length": tasks.length,
    tasks: tasks
  })
})

exports.updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;

  // console.log(id);

  const updatedTask = await Task.findByIdAndUpdate({ _id: id },
    { title, description, deadline },
    { new: true, runValidators: true });

  // console.log(updatedTask);
  return res.status(200).json({
    "status": "success",
    "updatedTask": updatedTask
  })
})

exports.deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.deleteOne({ _id: id })

  return res.status(200).json({
    "status": "Task deleted successfully"
  })
})