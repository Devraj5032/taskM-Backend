const mongoose = require("mongoose");

exports.connDB = async () => {
  const mainString = process.env.MONGODB_CONNECTION_STRING.replace(
    "<password>",
    process.env.MONGODB_DB_PASSWORD
  );

  try {
    const conn = await mongoose.connect(mainString);
    console.log(`DB connected ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw new Error("Error connecting to database");
  }
};
