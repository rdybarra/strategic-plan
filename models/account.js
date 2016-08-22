const thinky = require('./thinky');
const Plan = require('./plan');
const hashFunctions = require('../lib/hash-functions');

const type = thinky.type;
const r = thinky.r;

const Account = thinky.createModel('Account', {
  id: type.string(),
  email: type.string(),
  password: type.string(),
  created: type.date().default(r.now())
});

Account.hasMany(Plan, 'plans', 'id', 'userId')

Account.define('validPassword', function validPassword(password) {
  return hashFunctions.compare(password, this.password);
});

module.exports = Account;
