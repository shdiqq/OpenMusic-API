const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');
const AuthorizationError = require('../../../exception/AuthorizationError');

const deleteCollaboration = async (_this, playlistId, userId, owner) => {
  const queryCheckOwnerPlaylist = {
    text: 'SELECT * FROM playlist WHERE id = $1 AND owner = $2',
    values: [playlistId, owner],
  };
  const isPlaylistOwner = await _this._pool.query(queryCheckOwnerPlaylist);
  if (isPlaylistOwner.rows.length === 0) {
    throw new AuthorizationError(
      'User tidak dapat mengakses playlist tersebut'
    );
  }

  const queryCheckUser = {
    text: 'SELECT id, username, fullname FROM "user" WHERE id = $1',
    values: [userId],
  };
  const isUserFound = await _this._pool.query(queryCheckUser);
  if (!isUserFound.rows.length) {
    throw new NotFoundError('User tidak ditemukan');
  }

  const query = {
    text: 'DELETE FROM collaboration WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
    values: [playlistId, userId],
  };

  const result = await _this._pool.query(query);

  if (!result.rows.length) {
    throw new InvariantError('Kolaborasi gagal dihapus');
  }
};

module.exports = deleteCollaboration;
