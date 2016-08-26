/* eslint-disable new-cap */
const express = require('express');
const router = express.Router({mergeParams: true});
const Step = require('../models/step');
const stepHelper = require('../models/step-helper');
const AuthorizationError = require('../lib/authorization-error');
const routeHelper = require('./route-helper');

router.get('/', function allStepsRoute(req, res, next) {
  Step.filter({ planId: req.params.planId }).getJoin().orderBy('order').run().then(function allStepsDbCallback(steps) {
    if (steps.length) {
      if (!routeHelper.isAuthorized(req, steps[0].plan.accountId)) {
        return next(new AuthorizationError());
      }
    }

    res.json(steps);
  }).catch(next);
});

router.get('/:stepId', function getStepRoute(req, res, next) {
  Step.get(req.params.stepId).getJoin().run().then(function getStepDbCallback(step) {
    if (!routeHelper.isAuthorized(req, step.plan.accountId)) {
      return next(new AuthorizationError());
    }

    res.json(step);
  }).catch(next);
});

router.post('/', function postStepRoute(req, res, next) {
  let step = new Step(req.body);

  step.save().then(function saveStepDbCallback(step) {
    stepHelper.incrementSubsequentStepOrders(step).then(() => {
      res.json(step);
    }).catch(next);
  }).catch(next);
});

router.patch('/:stepId', function patchStepRoute(req, res, next) {
  Step.get(req.params.stepId).getJoin().run().then(function patchStepDbCallback(step) {
    if (!routeHelper.isAuthorized(req, step.plan.accountId)) {
      return next(new AuthorizationError());
    }

    step.merge(req.body).save().then(function saveStepDbCallback(updatedStep) {
      stepHelper.incrementSubsequentStepOrders(updatedStep).then(() => {
        res.json(updatedStep);
      }).catch(next);
    }).catch(next);
  });
});

router.delete('/:stepId', function deleteStepRoute(req, res, next) {
  Step.get(req.params.stepId).getJoin().then(function getStepDbCallback(step) {
    if (!routeHelper.isAuthorized(req, step.plan.accountId)) {
      return next(new AuthorizationError());
    }

    step.delete().then(function deleteStepDbCallback(deletedStep) {
      stepHelper.decrementSubsequentStepOrders(deletedStep).then(() => {
        res.json(deletedStep);
      }).catch(next);
    }).catch(next);
  }).catch(next);
});

module.exports = router;
