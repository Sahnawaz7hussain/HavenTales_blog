const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const dataBaseConnection = mongoose.connect(mongoUrl);
module.exports = dataBaseConnection;
