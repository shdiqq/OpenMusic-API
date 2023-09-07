const verifyPlaylistAccess = require('../../../util/verify-playlist-access');
const savePlaylistActivities = require('../../../util/save-playlist-activities');
const InvariantError = require('../../../exception/InvariantError');

const deleteSongFromPlaylistId = async (
  _this,
  { playlistId, songId, owner }
) => {
  await verifyPlaylistAccess(_this, playlistId, owner);

  const result = await _this._pool.query({
    text: 'DELETE FROM playlist_song WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
    values: [playlistId, songId],
  });

  if (!result.rows[0].id) {
    throw new InvariantError('song gagal dihapus dari playlist');
  }

  await savePlaylistActivities(_this, playlistId, songId, owner, 'delete');
};

module.exports = deleteSongFromPlaylistId;
