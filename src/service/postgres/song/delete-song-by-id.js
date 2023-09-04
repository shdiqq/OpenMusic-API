const NotFoundError = require('../../../exception/NotFoundError');

const deleteSongById = async (_this, id) => {
  const query = {
    text: 'DELETE FROM song WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
  }
};

module.exports = deleteSongById;
