const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');

const postSong = async (
  _this,
  { title, year, genre, performer, duration, albumId }
) => {
  const id = `song-${nanoid(16)}`;
  const createdAt = new Date();
  let query;

  if (albumId) {
    query = {
      text: 'INSERT INTO song(id, title, year, performer, genre, duration, album_id, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId, createdAt],
    };
  } else {
    query = {
      text: 'INSERT INTO song(id, title, year, performer, genre, duration, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, createdAt],
    };
  }

  const result = await _this._pool.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('song gagal ditambahkan');
  }

  return result.rows[0].id;
};

module.exports = postSong;
