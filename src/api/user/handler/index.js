const getUserById = require('./get-user-by-id');
const postUser = require('./post-user');

class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUserHandler = async (request, h) => {
    const result = await postUser(this, request, h);
    return result;
  }

  getUserByIdHandler = async (request, h) => {
    const result = await getUserById(this, request, h);
    return result;
  }
}

module.exports = UserHandler;
