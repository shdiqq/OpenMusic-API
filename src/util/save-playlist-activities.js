const { nanoid } = require('nanoid');

const savePlaylistActivities = async (
  _this,
  playlistId,
  songId,
  owner,
  action
) => {
  const idActivities = `playlist_song_activities-${nanoid(16)}`;
  const createdAt = new Date();
  const queryActivity = {
    text: `INSERT INTO playlist_song_activities(id, playlist_id, song_id, user_id, action, time, created_at) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: [
      idActivities,
      playlistId,
      songId,
      owner,
      action,
      createdAt,
      createdAt,
    ],
  };

  await _this._pool.query(queryActivity);
};

module.exports = savePlaylistActivities;
