const InvariantError = require("../../../exception/InvariantError");

const getUserByUsername = async (_this, username) => {
  const query = {
    text: 'SELECT username FROM "user" WHERE username = $1',
    values: [username],
  };

  const result = await _this._pool.query(query);

  if (result.rows.length > 0) {
    throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
  }
}

module.exports = getUserByUsername