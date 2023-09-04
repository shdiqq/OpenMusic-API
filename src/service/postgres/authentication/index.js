const { Pool } = require('pg');
const postRefreshToken = require('./post-refresh-token');
const getRefreshToken = require('./get-refresh-token');
const deleteRefreshToken = require('./delete-refresh-token');

class AuthenticationService {
  constructor() {
    this._pool = new Pool();
  }

  async postRefreshTokenService(token) {
    await postRefreshToken(this, token);
  }

  async getRefreshTokenService(token) {
    const result = await getRefreshToken(this, token);
    return result;
  }

  async deleteRefreshTokenService(token) {
    await deleteRefreshToken(this, token);
  }
}

module.exports = AuthenticationService;
