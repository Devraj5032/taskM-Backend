const express = require("express");
const { AllUser } = require("../controllers/userController");
const router = express.Router();

router.route("/allUsers").get(AllUser);

module.exports = router;
