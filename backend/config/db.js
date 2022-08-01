const mongoose = require('mongoose');
const dotenv = require('dotenv').config()



const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log(uri)
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
