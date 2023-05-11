const mongoose = require('mongoose');
require("dotenv").config();

const conn_str = process.env.CONN_STR

mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;
