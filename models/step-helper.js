const Step = require('./step');

const stepHelper = {

  adjustOtherStepOrders(newStep) {
    return new Promise(function(resolve, reject) {
      let promiseArray = [];
      Step.filter({ planId: newStep.planId }).run().then((steps) => {
        steps.forEach((step) => {
          if (step.id !== newStep.id && step.order >= newStep.order) {
            step.order += 1;
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
