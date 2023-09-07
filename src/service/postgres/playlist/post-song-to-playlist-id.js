const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');
const verifyPlaylistAccess = require('../../../util/verify-playlist-access');
const verifySong = require('../../../util/verify-song');
const savePlaylistActivities = require('../../../util/save-playlist-activities');

const postSongToPlayListId = async (_this, { playlistId, songId, owner }) => {
  await verifyPlaylistAccess(_this, playlistId, owner);

  await verifySong(_this, songId);

  const id = `playlist_song-${nanoid(16)}`;
  const createdAt = new Date();
  const result = await _this._pool.query({
    text: 'INSERT INTO playlist_song(id, playlist_id, song_id, created_at) VALUES($1, $2, $3, $4) RETURNING id',
    values: [id, playlistId, songId, createdAt],
  });

  if (!result.rows[0].id) {
    throw new InvariantError('song gagal ditambahkan ke dalam playlist');
  }

  await savePlaylistActivities(_this, playlistId, songId, owner, 'add');

  return result.rows[0].id;
};

module.exports = postSongToPlayListId;
