const verifyPlaylistAccess = require('../../../util/verify-playlist-access');

const getSongInPlaylistId = async (_this, id, owner) => {
  await verifyPlaylistAccess(_this, id, owner);

  const resultPlaylist = await _this._pool.query({
    text: 'SELECT p.id, p.name, u.username from playlist p LEFT JOIN "user" u on p.owner = u.id where p.id = $1',
    values: [id],
  });

  const resultSong = await _this._pool.query({
    text: `SELECT s.id, s.title, s.performer FROM song s LEFT JOIN playlist_song ps ON s.id = ps.song_id WHERE ps.playlist_id = $1`,
    values: [id],
  });

  resultPlaylist.rows[0].songs = resultSong.rows;
  return resultPlaylist.rows[0];
};

module.exports = getSongInPlaylistId;
