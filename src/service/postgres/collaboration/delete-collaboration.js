const InvariantError = require('../../../exception/InvariantError');
const verifyUser = require('../../../util/verify-user');
const verifyPlaylistOwner = require('../../../util/verify-playlist-owner');

const deleteCollaboration = async (_this, playlistId, userId, owner) => {
  await verifyPlaylistOwner(_this, playlistId, owner);

  await verifyUser(_this, userId);

  const result = await _this._pool.query({
    text: 'DELETE FROM collaboration WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
    values: [playlistId, userId],
  });

  if (!result.rows.length) {
    throw new InvariantError('Collaboration gagal dihapus');
  }

  return result.rows[0].id;
};

module.exports = deleteCollaboration;
