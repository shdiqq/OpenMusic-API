const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');

const postPlaylist = async ( _this, { name, owner } ) => {
  const id = `playlist-${nanoid(16)}`;
  const createdAt = new Date();
  
  const query = {
    text: 'INSERT INTO playlist(id, name, owner, created_at) VALUES($1, $2, $3, $4) RETURNING id',
    values: [id, name, owner, createdAt],
  };
  const result = await _this._pool.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('playlist gagal ditambahkan');
  }

  return result.rows[0].id;
};

module.exports = postPlaylist;
