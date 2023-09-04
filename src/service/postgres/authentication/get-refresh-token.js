const InvariantError = require("../../../exception/InvariantError");

const getRefreshToken = async (_this, token) => {
  const query = {
    text: 'SELECT token FROM authentication WHERE token = $1',
    values: [token],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new InvariantError('Refresh token tidak valid');
  }
}

module.exports = getRefreshToken;