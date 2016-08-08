const thinky = require('./thinky');

const type = thinky.type;
const r = thinky.r;

const Step = thinky.createModel('Step', {
  id: type.string(),
  planId: type.string(),
  name: type.string().min(1).required(),
  description: type.object(),
  completed: type.boolean().default(false),
  created: type.date().default(r.now())
});

module.exports = Step;
