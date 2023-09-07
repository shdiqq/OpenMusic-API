const NotFoundError = require('../../../exception/NotFoundError');

const getAlbumById = async (_this, id) => {
  const resultAlbum = await _this._pool.query({
    text: 'SELECT id, name, year, cover as "coverUrl" FROM album WHERE id = $1',
    values: [id],
  });
  if (!resultAlbum.rowCount) {
    throw new NotFoundError('Album tidak ditemukan');
  }

  const resultSong = await _this._pool.query({
    text: 'SELECT id, title, performer FROM song WHERE album_id = $1',
    values: [id],
  });
  resultAlbum.rows[0].songs = resultSong.rows;

  return resultAlbum.rows[0];
};

module.exports = getAlbumById;
