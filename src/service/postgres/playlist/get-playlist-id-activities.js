const AuthorizationError = require('../../../exception/AuthorizationError');
const NotFoundError = require('../../../exception/NotFoundError');

const getPlaylistIdActivities = async (_this, id, owner) => {
  const queryPlaylistActivities = {
    text: 'SELECT u.username, s.title, psa.action, psa.time FROM playlist_song_activities psa LEFT JOIN "user" u ON psa.user_id = u.id LEFT JOIN song s ON psa.song_id = s.id WHERE psa.playlist_id = $1 ORDER BY time asc',
    values: [id],
  };
  const resultPlaylistActivities = await _this._pool.query(
    queryPlaylistActivities
  );

  if (!resultPlaylistActivities.rows.length) {
    throw new NotFoundError('Playlist Song Activities tidak ditemukan');
  }
  const data = {
    playlistId: id,
    activities: resultPlaylistActivities.rows,
  };

  const queryCheckOwnerPlaylist = {
    text: 'SELECT * FROM playlist WHERE id = $1 AND owner = $2',
    values: [id, owner],
  };
  const isPlaylistOwner = await _this._pool.query(queryCheckOwnerPlaylist);
  if (isPlaylistOwner.rows.length === 0) {
    const queryCheckCollab = {
      text: 'SELECT * FROM collaboration WHERE playlist_id = $1 AND user_id = $2',
      values: [id, owner],
    };
    const isCollab = await _this._pool.query(queryCheckCollab);
    if (isCollab.rows.length === 0) {
      throw new AuthorizationError(
        'User tidak dapat mengakses playlist tersebut'
      );
    }
  }

  return data;
};

module.exports = getPlaylistIdActivities;
