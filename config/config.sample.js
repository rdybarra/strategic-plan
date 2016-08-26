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
    },
    replyToEmail: '',
    sendingEmail: '',
    url: ''
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
    },
    replyToEmail: '',
    sendingEmail: '',
    url: 'http://localhost:3000',
  };

  if (process.env.NODE_ENV === 'test') {
    config.db.db = '';
  }
}

module.exports = config;
