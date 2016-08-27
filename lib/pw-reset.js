const config = require('../config/config');
const jwt = require('jsonwebtoken');
const swig = require('swig');
const mailgun = require('mailgun-js')({ apiKey: config.mailgun.apiKey, domain: config.mailgun.domain });

const pwReset = {

  buildAndSendResetEmail: function buildAndSendResetEmail(email, targetUrl, templatePath) {
    const token = this._getToken(email);
    const url = this._getUrl(targetUrl, token);
    const body = this._getEmailBody(templatePath, {
      url: url
    });

    return this._sendEmail(email, body);
  },

  getEmailFromToken: function getEmailFromToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secret, (error, decoded) => {
        if (error) {
          return reject(error);
        }

        resolve(decoded.email);
      });
    });
  },

  _getToken: function _getToken(email) {
    return jwt.sign({ email: email }, config.jwt.secret, { expiresIn: '3 days' });
  },

  _getUrl: function _getUrl(url, token) {
    return url + '?token=' + token;
  },

  _getEmailBody: function _getEmailBody(templatePath, replacementValues) {
    let template = swig.compileFile(templatePath);
    return template(replacementValues);
  },

  _sendEmail: function _sendEmail(email, body) {
    return new Promise((resolve, reject) => {
      const messageOptions = {
        'from': config.sendingEmail,
        'to': email,
        'html': body,
        'subject': 'Password reset instructions',
        'replyTo': config.replyToEmail
      };

      mailgun.messages().send(messageOptions, function(error) {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  }

};

module.exports = pwReset;
