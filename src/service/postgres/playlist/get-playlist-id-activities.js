const NotFoundError = require('../../../exception/NotFoundError');
const verifyPlaylistAccess = require('../../../util/verify-playlist-access');

const getPlaylistIdActivities = async (_this, id, owner) => {
  await verifyPlaylistAccess(_this, id, owner);

  const resultPlaylistActivities = await _this._pool.query({
    text: 'SELECT u.username, s.title, psa.action, psa.time FROM playlist_song_activities psa LEFT JOIN "user" u ON psa.user_id = u.id LEFT JOIN song s ON psa.song_id = s.id WHERE psa.playlist_id = $1 ORDER BY time asc',
    values: [id],
  });
  if (!resultPlaylistActivities.rowCount) {
    throw new NotFoundError('Playlist Song Activities tidak ditemukan');
  }

  const data = {
    playlistId: id,
    activities: resultPlaylistActivities.rows,
  };
  return data;
};

module.exports = getPlaylistIdActivities;
