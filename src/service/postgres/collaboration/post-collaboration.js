const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');
const AuthorizationError = require('../../../exception/AuthorizationError');
const NotFoundError = require('../../../exception/NotFoundError');

const postCollaboration = async (_this, playlistId, userId, owner) => {
  const queryCheckUser = {
    text: 'SELECT id FROM "user" WHERE id = $1',
    values: [userId],
  };
  const isUserFound = await _this._pool.query(queryCheckUser);
  if (!isUserFound.rows.length) {
    throw new NotFoundError('User tidak ditemukan');
  }

  const queryCheckPlaylist = {
    text: 'SELECT id FROM playlist WHERE id = $1',
    values: [playlistId],
  };
  const isPlaylistFound = await _this._pool.query(queryCheckPlaylist);
  if (!isPlaylistFound.rows.length) {
    throw new NotFoundError('Playlist tidak ditemukan');
  }

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

  const id = `collab-${nanoid(16)}`;
  const query = {
    text: 'INSERT INTO collaboration VALUES($1, $2, $3) RETURNING id',
    values: [id, playlistId, userId],
  };
  const result = await _this._pool.query(query);
  if (!result.rows.length) {
    throw new InvariantError('Kolaborasi gagal ditambahkan');
  }
  return result.rows[0].id;
};

module.exports = postCollaboration;
