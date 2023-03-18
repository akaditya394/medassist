const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDb, disconnectDb };
