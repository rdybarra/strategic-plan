let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    db: {
      host: '',
      port: '',
      db: ''
    },
    jwt: {
      secret: ''
    }
  };
} else {
  config = {
    db: {
      host: '',
      port: '',
      db: ''
    },
    jwt: {
      secret: ''
    }
  };

  if (process.env.NODE_ENV === 'test') {
    config.db.db = '';
  }
}

module.exports = config;
