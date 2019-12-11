const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected');
  });

  mongoose.connection.on('error', () => {
    console.log('Cannot connect');
  });
}

module.exports = connect;
