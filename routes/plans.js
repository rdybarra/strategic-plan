/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const AuthorizationError = require('../lib/authorization-error');
const routeHelper = require('./route-helper');

router.get('/', function allPlansRoute(req, res, next) {
  Plan.filter({ accountId: req.user.accountId }).getJoin().run().then(function allPlansDbCallback(plans) {
    res.json(plans);
  }).catch(next);
});

router.post('/', function postPlanRoute(req, res, next) {
  let plan = new Plan({
    name: req.body.name,
    accountId: req.user.accountId
  });

  plan.save().then(function postPlanDbCallback(plan) {
    res.json(plan);
  }).catch(next);
});

router.get('/:planId', function getPlanRoute(req, res, next) {
  Plan.get(req.params.planId).getJoin({
    steps: {
      _apply: function orderPlanSteps(sequence) {
        return sequence.orderBy('order');
      }
    }
  }).run().then(function getPlanDbCallback(plan) {
    if (!routeHelper.isAuthorized(req, plan.accountId)) {
      return next(new AuthorizationError());
    }

    res.json(plan);
  }).catch(next);
});

router.patch('/:planId', function patchPlanRoute(req, res, next) {
  Plan.get(req.params.planId).run().then(function postPlanDbCallback(plan) {
    if (!routeHelper.isAuthorized(req, plan.accountId)) {
      return next(new AuthorizationError());
    }

    plan.merge(req.body).save().then(function savePlanDbCallback(updatedPlan) {
      res.json(updatedPlan);
    }).catch(next);
  });
});

router.delete('/:planId', function deletePlanRoute(req, res, next) {
  Plan.get(req.params.planId).getJoin().then(function getPlanDbCallback(plan) {
    if (!routeHelper.isAuthorized(req, plan.accountId)) {
      return next(new AuthorizationError());
    }

    plan.deleteAll().then(function deletePlanDbCallback(deletedPlan) {
      res.json(deletedPlan);
    }).catch(next);
  }).catch(next);
});

module.exports = router;
