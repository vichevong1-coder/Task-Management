// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if the variable exists here too
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error("Connection Error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;