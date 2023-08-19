const NotFoundError = require('../../../exception/NotFoundError');

const deleteAlbumById = async (_this, id) => {
  const query = {
    text: 'DELETE FROM album WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
  }
};

module.exports = deleteAlbumById;
