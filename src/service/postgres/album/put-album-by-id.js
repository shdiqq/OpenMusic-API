const NotFoundError = require('../../../exception/NotFoundError');

const putAlbumById = async (_this, id, { name, year }) => {
  const updatedAt = new Date().toISOString();
  const query = {
    text: 'UPDATE album SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
    values: [name, year, updatedAt, id],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
  }
};

module.exports = putAlbumById;
