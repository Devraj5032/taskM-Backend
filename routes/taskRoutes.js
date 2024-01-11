const express = require("express");
const { CreateTask, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { Protect } = require("../Middlewares/Protect");
const router = express.Router();

router.route("/createTask").post(CreateTask);
router.route("/getAllTasks").get(Protect , getAllTasks)
router.route("/:id").patch(Protect , updateTask).delete(Protect , deleteTask)

module.exports = router;
