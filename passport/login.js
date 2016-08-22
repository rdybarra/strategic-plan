const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account');

module.exports = function passportLoginModule(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    function passportLogin(email, password, done) {
      Account.filter({ email: email }).getJoin().limit(1).run().then(function passpotLoginAccountFilter(account) {
        account = account.shift();

        if (!account) {
          return done(null, false, { message: 'No email found.' });
        }

        if (!account.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, account);

      }).error(function passportLoginError(error) {
        return done(error);
      });
    }
  ));
};
