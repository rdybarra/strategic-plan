const Account = require('./account');
const hashFunctions = require('../lib/hash-functions');

const accountHelper = {

  createAccount: function createAccount(email, password) {
    let account = new Account({
      email: email,
      password: hashFunctions.createHash(password)
    });

    return account.save();
  },

  updatePasswordForAccountWithEmail: function updatePasswordForAccountWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      Account.filter({ email: email }).run().then((accounts) => {
        if (accounts.length < 1) {
          return reject(new Error('No account was found with that email address.'));
        }

        let account = accounts[0];
        account.password = hashFunctions.createHash(password);
        account.save().then(resolve).catch(reject);
      }).catch(reject);
    });
  }

};

module.exports = accountHelper;
