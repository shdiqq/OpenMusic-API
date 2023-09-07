const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../../exception/InvariantError');

// Constants from .env
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

const postUser = async (_this, { username, password, fullname }) => {
  await _this.getUserByUsernameService(username);
  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const query = {
    text: 'INSERT INTO "user" VALUES($1, $2, $3, $4) RETURNING id',
    values: [id, username, hashedPassword, fullname],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new InvariantError('User gagal ditambahkan');
  }
  return result.rows[0].id;
};

module.exports = postUser;
