const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.default.isEmail, "Enter valid email"],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [4, "Enter password of at least more than 4 characters"],
  },
});

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

exports.User = mongoose.model("User", userModel);
