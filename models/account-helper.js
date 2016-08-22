const Account = require('./account');
const hashFunctions = require('../lib/hash-functions');

const accountHelper = {

  createAccount: function createAccount(email, password) {
    let account = new Account({
      email: email,
      password: hashFunctions.createHash(password)
    });

    return account.save();
  }

};

module.exports = accountHelper;
