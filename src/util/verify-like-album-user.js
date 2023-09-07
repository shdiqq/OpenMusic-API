const ClientError = require('../exception/ClientError');

const verifyLikeAlbumUser = async (_this, albumId, userId) => {
  const resultOwnerPlaylist = await _this._pool.query({
    text: 'SELECT id FROM user_album_like WHERE album_id = $1 AND user_id = $2',
    values: [albumId, userId],
  });
  if (resultOwnerPlaylist.rowCount)
    throw new ClientError('User sudah melakukan like pada album tersebut');
};

module.exports = verifyLikeAlbumUser;
