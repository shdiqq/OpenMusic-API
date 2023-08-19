const NotFoundError = require('../../../exception/NotFoundError');

const getSongById = async (_this, id) => {
  const query = {
    text: 'SELECT * FROM song WHERE id = $1',
    values: [id],
  };
  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new NotFoundError('Song tidak ditemukan');
  }

  return result.rows[0];
};

module.exports = getSongById;
