const thinky = require('./thinky');
const Step = require('./step');

const type = thinky.type;
const r = thinky.r;

const Plan = thinky.createModel('Plan', {
  id: type.string(),
  name: type.string().min(1).required(),
  created: type.date().default(r.now()),
  accountId: type.string().required()
});

Plan.hasMany(Step, 'steps', 'id', 'planId')
Step.belongsTo(Plan, 'plan', 'planId', 'id');

module.exports = Plan;
