const express = require("express");
const { CreateTask } = require("../controllers/taskController");
const router = express.Router();

router.route("/createTask").post(CreateTask);

module.exports = router;
