const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const accountHelper = require('../models/account-helper');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
  const token = jwt.sign({ account_id: req.user.id }, config.jwt.secret);

  res.json({
    auth_token: token
  });
});

router.post('/account', function(req, res, next) {
  accountHelper.createAccount(req.body.email, req.body.password).then((account) => {
    res.json(account);
  }).catch(next);
});

module.exports = router;
