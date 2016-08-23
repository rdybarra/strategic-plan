class AuthorizationError extends Error {
  constructor() {
    super('Permission denied');

    this.status = 401;
  }
}

module.exports = AuthorizationError;
