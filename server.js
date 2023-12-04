const express = require("express");
const { connDB } = require("./db");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser')

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

connDB();
app.use("/api", authRoutes);

app.listen(PORT, () => {
  try {
    console.log(`Server started at port : ${PORT}`);
  } catch (error) {
    console.log("Error starting port " + error);
  }
});
