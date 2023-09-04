const NotFoundError = require('../../../exception/NotFoundError');

const getAlbumById = async (_this, id) => {
  const queryAlbum = {
    text: 'SELECT id, name, year FROM album WHERE id = $1',
    values: [id],
  };
  const resultAlbum = await _this._pool.query(queryAlbum);

  const querySong = {
    text: 'SELECT id, title, performer FROM song WHERE album_id = $1',
    values: [id],
  };
  const resultSong = await _this._pool.query(querySong);

  if (!resultAlbum.rows.length) {
    throw new NotFoundError('Album tidak ditemukan');
  }

  resultAlbum.rows[0].songs = resultSong.rows;

  return resultAlbum.rows[0];
};

module.exports = getAlbumById;
