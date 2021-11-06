const mongoose = require('mongoose');
const { config } = require('../config');
const debug = require('debug')('server:app');

async function mongoLoader() {
  await mongoose
    .connect(config.mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(async (res) => {
      // eslint-disable-next-line no-console
      console.log('Connected to MongoDB!');
      if (config.env === 'development');
      return res.connection;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      debug('MongoDB error: ' + err);
    });
}

module.exports = { mongoLoader };
