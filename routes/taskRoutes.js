const express = require("express");
const { CreateTask, getAllTasks } = require("../controllers/taskController");
const { Protect } = require("../Middlewares/Protect");
const router = express.Router();

router.route("/createTask").post(CreateTask);
router.route("/getAllTasks").get(Protect , getAllTasks)

module.exports = router;
