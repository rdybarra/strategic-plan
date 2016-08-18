const expect = require('chai').expect;
const stepHelper = require('../models/step-helper');
const Step = require('../models/step');

describe('step-helper', function describeStepHelper() {

  beforeEach(function stepHelperBeforeEach(done) {
    let promiseArray = [];

    let firstStep = new Step({
      name: 'First',
      planId: '1',
      order: 0
    });

    let lastStep = new Step({
      name: 'Last',
      planId: '1',
      order: 1
    });

    promiseArray.push(firstStep.save());
    promiseArray.push(lastStep.save());

    Promise.all(promiseArray).then(() => {
      done();
    });
  });

  afterEach(function stepHelperAfterEach(done) {
    let promiseArray = [];

    Step.run().then((steps) => {
      steps.forEach((step) => {
        promiseArray.push(step.delete());
      });

      Promise.all(promiseArray).then(() => {
        done();
      }).catch(done);
    });
  });

  describe('adjustOtherStepOrders', function describeAdjustOtherStepOrders() {
    it('should adjust sibling step orders to allow step placed in beginning', function(done) {
      let newStep = new Step({
        name: 'new',
        planId: '1',
        order: 0
      });

      stepHelper.adjustOtherStepOrders(newStep).then(() => {
        Step.filter({ planId: '1'}).orderBy('order').run().then((steps) => {
          expect(steps[0].order).to.equal(1);
          expect(steps[1].order).to.equal(2);

          done();
        }).catch(done);
      }).catch(done);
    });

    it('should NOT adjust sibling step orders if new step is at the end.', function(done) {
      let newStep = new Step({
        name: 'new',
        planId: '1',
        order: 2
      });

      stepHelper.adjustOtherStepOrders(newStep).then(() => {
        Step.filter({ planId: '1'}).orderBy('order').run().then((steps) => {
          expect(steps[0].order).to.equal(0);
          expect(steps[1].order).to.equal(1);

          done();
        }).catch(done);
      }).catch(done);
    });

    it('should adjust LATER sibling step orders if new step is in the middle.', function(done) {
      let newStep = new Step({
        name: 'new',
        planId: '1',
        order: 1
      });

      stepHelper.adjustOtherStepOrders(newStep).then(() => {
        Step.filter({ planId: '1'}).orderBy('order').run().then((steps) => {
          expect(steps[0].order).to.equal(0);
          expect(steps[1].order).to.equal(2);

          done();
        }).catch(done);
      }).catch(done);
    });
  });

});
