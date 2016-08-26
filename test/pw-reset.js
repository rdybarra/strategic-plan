const expect = require('chai').expect;
const pwReset = require('../lib/pw-reset');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

describe('pwReset', function describePwReset() {

  describe('getEmailFromToken', function describeGetEmailFromToken() {
    it('should confirm if a token has an email address', function(done) {
      const targetEmail = 'test@example.com';

      let result = pwReset._getToken(targetEmail);
      pwReset.getEmailFromToken(result).then((decodedEmail) => {
        expect(decodedEmail).to.equal(targetEmail);
        done();
      }).catch(done);
    });
  });

  describe('_getToken', function describeGetToken() {
    it('should get a token that includes an email', function(done) {
      const email = 'test@example.com';

      let result = pwReset._getToken(email);
      jwt.verify(result, config.jwt.secret, (error, decoded) => {
        if (error) {
          done(error);
        }

        expect(decoded.email).to.equal(email);
        done();
      });
    });
  });

  describe('_getUrl', function describeGetUrl() {
    it('should append a token onto the url', function(done) {
      const url = 'http://localhost:3000/reset';
      const token = '1234';

      let result = pwReset._getUrl(url, token);

      expect(result).to.equal(url + '?token=' + token);
      done();
    });
  });

  describe('_getEmailBody', function describeGetEmailBody() {
    it('should insert the token into the email template', function(done) {
      const url = 'http://localhost:3000/reset';

      let result = pwReset._getEmailBody(__dirname + '/../views/reset-password/email.template.html', {
        url: url
      });

      // Should include the URL
      expect(result).to.include(url);

      // For kicks, check some of the template is there as well.
      expect(result).to.include('A password reset has been initialized');
      done();
    });
  });

});
