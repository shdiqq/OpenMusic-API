const NotFoundError = require('../../../exception/NotFoundError');

const getAlbumById = async (_this, id) => {
  const query = {
    text: 'SELECT id, name, year FROM album WHERE id = $1',
    values: [id],
  };
  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Album tidak ditemukan');
  }

  return result.rows[0];
};

module.exports = getAlbumById;
