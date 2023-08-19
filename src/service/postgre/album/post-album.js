const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');

const postAlbum = async (_this, { name, year }) => {
  const id = `album-${nanoid(16)}`;
  const createdAt = new Date();

  const query = {
    text: 'INSERT INTO album(id, name, year, created_at) VALUES($1, $2, $3, $4) RETURNING id',
    values: [id, name, year, createdAt],
  };

  const result = await _this._pool.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('Album gagal ditambahkan');
  }

  return result.rows[0].id;
};

module.exports = postAlbum;
