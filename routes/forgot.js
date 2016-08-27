/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const config = require('../config/config');
const accountHelper = require('../models/account-helper');
const pwReset = require('../lib/pw-reset');

// 1. Show a form where a user can enter their email.
router.get('/start-reset-password', function getStartResetPasswordRoute(req, res, next) {
  res.render('reset-password/init-reset');
});

// 2. Send an email to the provided email address.
router.post('/start-reset-password', function postStartResetPasswordRoute(req, res, next) {
  pwReset.buildAndSendResetEmail(
    req.body.email,
    config.url + '/forgot/reset-password',
    __dirname + '/../views/reset-password/email.template.html').then(() => {
      res.render('reset-password/init-reset-complete');
    }).catch(next);
});

// 3. Have a landing page for the incoming email link to let the user change their password.
router.get('/reset-password', function getResetPasswordRoute(req, res, next) {
  pwReset.getEmailFromToken(req.query.token).then(() => {
    res.render('reset-password/set-password', {
      token: req.query.token
    });
  }).catch(next);
});

// 4. Change the password.
router.post('/reset-password', function postResetPasswordRoute(req, res, next) {
  pwReset.getEmailFromToken(req.body.token).then((email) => {
    accountHelper.updatePasswordForAccountWithEmail(email, req.body.password).then(() => {
      res.render('reset-password/password-reset-complete');
    }).catch(next);
  }).catch(next);
});

module.exports = router;
