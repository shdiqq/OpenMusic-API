const NotFoundError = require('../../../exception/NotFoundError');

const deleteAlbumById = async (_this, id) => {
  const checkSong = {
    text: 'SELECT id, title, album_id FROM song WHERE album_id = $1',
    values: [id],
  };

  const querySong = {
    text: 'DELETE FROM song WHERE album_id = $1 RETURNING id',
    values: [id],
  };

  const queryAlbum = {
    text: 'DELETE FROM album WHERE id = $1 RETURNING id',
    values: [id],
  };

  const isSongFound = await _this._pool.query(checkSong);
  if (isSongFound.rows.length === 0) await _this._pool.query(querySong);

  const resultAlbum = await _this._pool.query(queryAlbum);
  if (!resultAlbum.rows.length) {
    throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
  }
};

module.exports = deleteAlbumById;
