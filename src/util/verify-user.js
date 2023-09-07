const NotFoundError = require('../exception/NotFoundError');

const verifyUser = async (_this, userId) => {
  const resultUserId = await _this._pool.query({
    text: 'SELECT id FROM "user" WHERE id = $1',
    values: [userId],
  });
  if (!resultUserId.rowCount) throw new NotFoundError('User tidak ditemukan');
};

module.exports = verifyUser;
