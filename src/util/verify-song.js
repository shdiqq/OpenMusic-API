const NotFoundError = require('../exception/NotFoundError');

const verifySong = async (_this, songId) => {
  const resultSongId = await _this._pool.query({
    text: 'SELECT id FROM song WHERE id = $1',
    values: [songId],
  });
  if (!resultSongId.rowCount) throw new NotFoundError('Song tidak ditemukan');
};

module.exports = verifySong;
