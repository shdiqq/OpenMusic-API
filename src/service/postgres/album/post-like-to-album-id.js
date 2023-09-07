const { nanoid } = require('nanoid');
const InvariantError = require('../../../exception/InvariantError');
const verifyLikeAlbumUser = require('../../../util/verify-like-album-user');

const postLikeToAlbumId = async (_this, albumId, userId) => {
  await _this.getAlbumByIdService(albumId);

  await verifyLikeAlbumUser(_this, albumId, userId);

  const id = `user_album_like-${nanoid(16)}`;
  const resultInsert = await _this._pool.query({
    text: 'INSERT INTO user_album_like(id, album_id, user_id) VALUES($1, $2, $3) RETURNING id',
    values: [id, albumId, userId],
  });

  if (!resultInsert.rowCount) {
    throw new InvariantError('Gagal menyukai album');
  }

  await _this._cacheService.delete(`countAlbumLike:${id}`);

  const message = 'Berhasil menyukai album';
  return message;
};

module.exports = postLikeToAlbumId;
