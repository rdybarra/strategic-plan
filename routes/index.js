/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const accountHelper = require('../models/account-helper');

router.get('/', function homeRoute(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', { session: false }), function postLoginRoute(req, res) {
  const token = jwt.sign({ accountId: req.user.id }, config.jwt.secret);

  /* eslint-disable camelcase */

  res.json({
    auth_token: token
  });

  /* eslint-enable */
});

router.post('/account', function postAccountRoute(req, res, next) {
  accountHelper.createAccount(req.body.email, req.body.password).then((account) => {
    const token = jwt.sign({ accountId: account.id }, config.jwt.secret);

    /* eslint-disable camelcase */

    res.json({
      auth_token: token
    });

    /* eslint-enable */
  }).catch(next);
});

module.exports = router;
