const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { catchAsync } = require("./errorController");
const AppError = require('./../utils/AppError');
const { mailSender } = require("../utils/MainSender");

exports.SignUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "error",
      message: "Password and confirmPassword do not match",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    newUser.password = undefined;

    const token = jwt.sign({ "id": newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    return res.status(201).json({
      success: "true",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.Login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      status: "error",
      message: "Enter email and password",
    });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      status: "error",
      message: "No account found with this email",
    });
  }

  const matchPass = await bcrypt.compare(password, existingUser.password);

  if (!matchPass) {
    return res.status(400).json({
      status: "error",
      message: "Email or Password is wrong",
    });
  }
  existingUser.password = undefined;

  const token = jwt.sign({ "id": existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return res.status(200).json({
    status: "success",
    token,
    user: existingUser,
  });
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email }).select("-password")

  if (!existingUser) {
    return next(new AppError('There is no user with this email', 404))
  }

  // const sendingStatus = await mailSender(req.body.email, "Hello")
  // console.log(sendingStatus);

  return res.status(200).json(existingUser)
})

exports.resetPassword = catchAsync(async (req, res, next) => { })