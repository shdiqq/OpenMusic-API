const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');
const AuthorizationError = require('../../../exception/AuthorizationError');

const postSongToPlayListId = async ( _this, { playlistId, songId, owner } ) => {
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

  const queryCheckSong = {
    text: 'SELECT * FROM song WHERE id = $1',
    values: [songId],
  };

  const isSongIdFound = await _this._pool.query(queryCheckSong);

  if (isSongIdFound.rows.length === 0) {
    throw new NotFoundError('Song tidak ditemukan');
  }

  const id = `playlist_song-${nanoid(16)}`;
  const createdAt = new Date();
  const query = {
    text: 'INSERT INTO playlist_song(id, playlist_id, song_id, created_at) VALUES($1, $2, $3, $4) RETURNING id',
    values: [id, playlistId, songId, createdAt],
  }
  const result = await _this._pool.query(query);
  if (!result.rows[0].id) {
    throw new InvariantError('song gagal ditambahkan');
  }

  const idActivities = `playlist_song_activities-${nanoid(16)}`;
  const queryActivity = {
    text: `INSERT INTO playlist_song_activities(id, playlist_id, song_id, user_id, action, time, created_at) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: [idActivities, playlistId, songId, owner, `add`,createdAt, createdAt],
  }
  await _this._pool.query(queryActivity);

  return result.rows[0].id;
};

module.exports = postSongToPlayListId;
