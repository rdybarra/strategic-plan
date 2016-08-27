const routeHelper = {
  isAuthorized: function isAuthorized(req, resourceAccountId) {
    return req.user.accountId === resourceAccountId;
  }
};

module.exports = routeHelper;
