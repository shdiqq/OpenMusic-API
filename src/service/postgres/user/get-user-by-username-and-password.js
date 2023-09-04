const bcrypt = require('bcrypt');
const AuthenticationError = require('../../../exception/AuthenticationError');

const getUserByUsernameAndPassword = async (_this, username, password) => {
  const query = {
    text: 'SELECT id, password FROM "user" WHERE username = $1',
    values: [username],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new AuthenticationError('Kredensial yang Anda berikan salah');
  }

  const { id, password: hashedPassword } = result.rows[0];

  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new AuthenticationError('Kredensial yang Anda berikan salah');
  }

  return id;
};

module.exports = getUserByUsernameAndPassword;
