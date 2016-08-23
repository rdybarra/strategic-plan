const routeHelper = {
  isAuthorized: function isAuthorized(req, resourceAccountId) {
    return req.user.account_id === resourceAccountId;
  }
};

module.exports = routeHelper;
