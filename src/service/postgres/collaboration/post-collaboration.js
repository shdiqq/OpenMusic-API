const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');
const verifyUser = require('../../../util/verify-user');
const verifyPlaylistOwner = require('../../../util/verify-playlist-owner');

const postCollaboration = async (_this, playlistId, userId, owner) => {
  await verifyUser(_this, userId);

  await verifyPlaylistOwner(_this, playlistId, owner);

  const id = `collab-${nanoid(16)}`;
  const result = await _this._pool.query({
    text: 'INSERT INTO collaboration VALUES($1, $2, $3) RETURNING id',
    values: [id, playlistId, userId],
  });

  if (!result.rows.length) {
    throw new InvariantError('Kolaborasi gagal ditambahkan');
  }
  return result.rows[0].id;
};

module.exports = postCollaboration;
