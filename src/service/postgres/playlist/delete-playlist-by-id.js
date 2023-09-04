const AuthorizationError = require('../../../exception/AuthorizationError');
const NotFoundError = require('../../../exception/NotFoundError');

const deletePlaylistById = async (_this, id, owner) => {
  const queryCheckOwnerPlaylist = {
    text: 'SELECT * FROM playlist WHERE id = $1 AND owner = $2',
    values: [id, owner],
  };

  const isPlaylistOwner = await _this._pool.query(queryCheckOwnerPlaylist);
  if (isPlaylistOwner.rows.length === 0) {
    throw new AuthorizationError('User tidak dapat mengakses playlist tersebut');
  }

  const queryPlaylistSong = {
    text: 'DELETE FROM playlist_song WHERE playlist_id = $1',
    values: [id],
  };
   await _this._pool.query(queryPlaylistSong);

  const queryPlaylist = {
    text: 'DELETE FROM playlist WHERE id = $1 RETURNING id',
    values: [id],
  };
  const result = await _this._pool.query(queryPlaylist);

  if (!result.rows.length) {
    throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
  }
};

module.exports = deletePlaylistById;
