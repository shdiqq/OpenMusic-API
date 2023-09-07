const AuthorizationError = require('../exception/AuthorizationError');
const NotFoundError = require('../exception/NotFoundError');

const verifyPlaylistOwner = async (_this, playlistId, owner) => {
  const resultOwnerPlaylist = await _this._pool.query({
    text: 'SELECT owner FROM playlist WHERE id = $1',
    values: [playlistId],
  });
  if (!resultOwnerPlaylist.rowCount)
    throw new NotFoundError('Playlist tidak ditemukan');

  if (resultOwnerPlaylist.rows[0].owner !== owner) {
    throw new AuthorizationError(
      'User tidak dapat mengakses playlist tersebut'
    );
  }
};

module.exports = verifyPlaylistOwner;
