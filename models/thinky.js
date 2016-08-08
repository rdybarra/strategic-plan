const config = require('../config/config.js');

const options = {
  host: config.db.host,
  port: config.db.port,
  db: config.db.db
};

const thinky = require('thinky')(options);

module.exports = thinky;
