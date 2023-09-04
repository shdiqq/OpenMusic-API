const NotFoundError = require('../../../exception/NotFoundError');

const getUserById = async (_this, userId) => {
  const query = {
    text: 'SELECT id, username, fullname FROM "user" WHERE id = $1',
    values: [userId],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('User tidak ditemukan');
  }

  return result.rows[0];
};

module.exports = getUserById;
