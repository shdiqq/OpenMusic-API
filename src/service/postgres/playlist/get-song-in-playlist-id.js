const AuthorizationError = require('../../../exception/AuthorizationError');
const NotFoundError = require('../../../exception/NotFoundError');

const getSongInPlaylistId = async (_this, id, owner) => {
  const queryPlaylist = {
    text: 'SELECT p.id, p.name, u.username from playlist p LEFT JOIN "user" u on p.owner = u.id where p.id = $1',
    values: [id],
  };
  const resultPlaylist = await _this._pool.query(queryPlaylist);

  const querySong = {
    text: `SELECT s.id, s.title, s.performer FROM song s LEFT JOIN playlist_song ps ON s.id = ps.song_id WHERE ps.playlist_id = $1`,
    values: [id],
  };
  const resultSong = await _this._pool.query(querySong);

  if (!resultPlaylist.rows.length && !resultSong.rows.length) {
    throw new NotFoundError('Playlist tidak ditemukan');
  }
  resultPlaylist.rows[0].songs = resultSong.rows;

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

  return resultPlaylist.rows[0];
};

module.exports = getSongInPlaylistId;
