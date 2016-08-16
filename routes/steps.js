'use strict'

const express = require('express');
const router = express.Router({mergeParams: true});
const Step = require('../models/step');

router.get('/', function allStepsRoute(req, res, next) {
  Step.filter({ planId: req.params.planId }).run().then(function allStepsDbCallback(steps) {
    res.json(steps);
  }).catch(next);
});

router.get('/:stepId', function getStepRoute(req, res, next) {
  Step.get(req.params.stepId).run().then(function getStepDbCallback(step) {
    res.json(step);
  }).catch(next);
});

router.post('/', function postStepRoute(req, res, next) {
  let step = new Step(req.body);

  step.save().then(function saveStepDbCallback(step) {
    res.json(step);
  }).catch(next);
});

router.patch('/:stepId', function patchStepRoute(req, res, next) {
  Step.get(req.params.stepId).run().then(function patchStepDbCallback(step) {
    step.merge(req.body).save().then(function saveStepDbCallback(updatedStep) {
      res.json(updatedStep);
    }).catch(next);
  });
});

router.delete('/:stepId', function deleteStepRoute(req, res, next) {
  Step.get(req.params.stepId).then(function getStepDbCallback(step) {
    step.delete().then(function deleteStepDbCallback(deletedStep) {
      res.json(deletedStep);
    }).catch(next);
  }).catch(next);
});

module.exports = router;
