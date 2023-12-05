const express = require("express");
const { connDB } = require("./db");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

connDB();
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  try {
    console.log(`Server started at port : ${PORT}`);
  } catch (error) {
    console.log("Error starting port " + error);
  }
});
