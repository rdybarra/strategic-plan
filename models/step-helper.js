const Step = require('./step');

const stepHelper = {

  incrementSubsequentStepOrders: function incrementSubsequentStepOrders(referenceStep) {
    return this._incrementOrDecrementSubsequentStepOrdersFromStep(referenceStep, true);
  },

  decrementSubsequentStepOrders: function decrementSubsequentStepOrders(referenceStep) {
    return this._incrementOrDecrementSubsequentStepOrdersFromStep(referenceStep, false);
  },

  _incrementOrDecrementSubsequentStepOrdersFromStep: function(referenceStep, shouldIncrement) {
    return new Promise(function _incrementOrDecrementSubsequentStepOrdersFromStepPromise(resolve, reject) {
      let promiseArray = [];
      Step.filter({ planId: referenceStep.planId }).run().then((steps) => {
        steps.forEach((step) => {
          if (step.id !== referenceStep.id && step.order >= referenceStep.order) {
            if (shouldIncrement) {
              step.order += 1;
            } else {
              step.order -= 1;
            }

            promiseArray.push(step.save());
          }
        });

        Promise.all(promiseArray).then((results) => {
          resolve(results);
        }).catch(reject);
      }).catch(reject);
    });
  }
};

module.exports = stepHelper;
