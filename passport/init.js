const login = require('./login');
const Account = require('../models/account');

module.exports = function passportInitModule(passport) {
  passport.serializeUser(function(account, done) {
    done(null, account.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.get(id).run().then((account) => {
      done(null, account);
    }).catch(done);
  });

  login(passport);
};
