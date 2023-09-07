const InvariantError = require('../../../exception/InvariantError');
const verifyPlaylistOwner = require('../../../util/verify-playlist-owner');

const deletePlaylistById = async (_this, id, owner) => {
  await verifyPlaylistOwner(_this, id, owner);

  await _this._pool.query({
    text: 'DELETE FROM playlist_song WHERE playlist_id = $1',
    values: [id],
  });

  const result = await _this._pool.query({
    text: 'DELETE FROM playlist WHERE id = $1 RETURNING id',
    values: [id],
  });

  if (!result.rows[0].id) {
    throw new InvariantError('playlist gagal dihapus');
  }
};

module.exports = deletePlaylistById;
