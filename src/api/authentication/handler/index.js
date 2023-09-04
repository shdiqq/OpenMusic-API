const deleteAuthentication = require('./delete-authentication');
const postAuthentication = require('./post-authentication');
const putAuthentication = require('./put-authentication');

class AuthenticationHandler {
  constructor(authenticationService, userService, tokenManager, validator) {
    this._authenticationService = authenticationService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  postAuthenticationHandler = async (request, h) => {
    const result = await postAuthentication(this, request, h);
    return result;
  }

  putAuthenticationHandler = async (request) => {
    const result = await putAuthentication(this, request);
    return result;
  }

  deleteAuthenticationHandler = async (request) => {
    const result = await deleteAuthentication(this, request);
    return result;
  }
}

module.exports = AuthenticationHandler;
