const { nanoid } = require('nanoid');
const AuthorizationError = require('../../../exception/AuthorizationError');
const NotFoundError = require('../../../exception/NotFoundError');

const deleteSongFromPlaylistId = async (_this, { playlistId, songId, owner }) => {
  const queryCheckOwnerPlaylist = {
    text: 'SELECT * FROM playlist WHERE id = $1 AND owner = $2',
    values: [playlistId, owner],
  };
  const isPlaylistOwner = await _this._pool.query(queryCheckOwnerPlaylist);
  if (isPlaylistOwner.rows.length === 0) {
    const queryCheckCollab = {
      text: 'SELECT * FROM collaboration WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, owner],
    }
    const isCollab = await _this._pool.query(queryCheckCollab);
    if (isCollab.rows.length === 0) {
      throw new AuthorizationError('User tidak dapat mengakses playlist tersebut');
    }
  }

  const query = {
    text: 'DELETE FROM playlist_song WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
    values: [playlistId, songId],
  };
  const result = await _this._pool.query(query);
  if (!result.rows.length) {
    throw new NotFoundError('Song gagal dihapus pada playlist. Id tidak ditemukan');
  }

  const idActivities = `playlist_song_activities-${nanoid(16)}`;
  const createdAt = new Date();
  const queryActivity = {
    text: `INSERT INTO playlist_song_activities(id, playlist_id, song_id, user_id, action, time, created_at) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: [idActivities, playlistId, songId, owner, `delete`,createdAt, createdAt],
  }

  await _this._pool.query(queryActivity);
};

module.exports = deleteSongFromPlaylistId;
