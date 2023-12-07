const express = require("express");
const { connDB } = require("./db");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const AppError = require("./utils/AppError");
const { globalErrorHandler } = require("./controllers/errorController");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

connDB();
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  try {
    console.log(`Server started at port : ${PORT}`);
  } catch (error) {
    console.log("Error starting port " + error);
  }
});
