'use strict'

const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');

router.get('/', function allPlansRoute(req, res, next) {
  Plan.getJoin().run().then(function allPlansDbCallback(plans) {
    res.json(plans);
  }).catch(next);
});

router.post('/', function postPlanRoute(req, res, next) {
  let plan = new Plan({
    name: req.body.name
  });

  plan.save().then(function postPlanDbCallback(plan) {
    res.json(plan);
  }).catch(next);
});

router.get('/:planId', function getPlanRoute(req, res, next) {
  Plan.get(req.params.planId).getJoin({
    steps: {
      _apply: function(sequence) {
        return sequence.orderBy('order');
      }
    }
  }).run().then(function getPlanDbCallback(plan) {
    res.json(plan);
  }).catch(next);
});

router.patch('/:planId', function patchPlanRoute(req, res, next) {
  Plan.get(req.params.planId).run().then(function postPlanDbCallback(plan) {
    plan.merge(req.body).save().then(function savePlanDbCallback(updatedPlan) {
      res.json(updatedPlan);
    }).catch(next);
  });
});

router.delete('/:planId', function deletePlanRoute(req, res, next) {
  Plan.get(req.params.planId).getJoin().then(function getPlanDbCallback(plan) {
    plan.deleteAll().then(function deletePlanDbCallback(deletedPlan) {
      res.json(deletedPlan);
    }).catch(next);
  }).catch(next);
});

module.exports = router;
