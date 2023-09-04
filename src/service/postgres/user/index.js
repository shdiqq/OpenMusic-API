const { Pool } = require('pg');
const postUser = require('./post-user');
const getUserByUsername = require('./get-user-by-username');
const getUserById = require('./get-user-by-id');
const getUserByUsernameAndPassword = require('./get-user-by-username-and-password');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async postUserService({ username, password, fullname }) {
    const result = await postUser(this, {username, password, fullname});
    return result;
  }

  async getUserByUsernameService(username) {
    const result = await getUserByUsername(this, username);
    return result;
  }

  async getUserByIdService(userId) {
    const result = await getUserById(this, userId);
    return result;
  }

  async getUserByUsernameAndPasswordService(username, password) {
    const result = await getUserByUsernameAndPassword(this, username, password)
    return result;
  }
}

module.exports = UserService;
