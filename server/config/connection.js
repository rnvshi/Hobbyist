const mongoose = require('mongoose');

const conn_str = 'mongodb+srv://ishaarahman:t3y7cckFzh0r8zVl@cluster0.wdb1ist.mongodb.net/'

mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;
