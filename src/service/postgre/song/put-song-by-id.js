const NotFoundError = require('../../../exception/NotFoundError');

const putSongById = async (
  _this,
  id,
  { title, year, genre, performer, duration, albumId }
) => {
  const updatedAt = new Date().toISOString();
  let query;

  if (albumId) {
    query = {
      text: 'UPDATE song SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, albumId = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, updatedAt, id],
    };
  } else {
    query = {
      text: 'UPDATE song SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, updatedAt, id],
    };
  }

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
  }
};

module.exports = putSongById;
