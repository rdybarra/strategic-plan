const bCrypt = require('bcrypt-nodejs');

const hashFunctions = {

  createHash: function createHash(text) {
    return bCrypt.hashSync(text, bCrypt.genSaltSync(10), null);
  },

  compare: function compare(text, hash) {
    return bCrypt.compareSync(text, hash);
  }

};

module.exports = hashFunctions;
