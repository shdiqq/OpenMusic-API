const InvariantError = require('../../../exception/InvariantError');

const deleteLikeInAlbumId = async (_this, id, userId) => {
  await _this.getAlbumByIdService(id);

  const resultDelete = await _this._pool.query({
    text: 'DELETE FROM user_album_like WHERE album_id = $1 AND user_id = $2 RETURNING id',
    values: [id, userId],
  });

  if (!resultDelete.rowCount) {
    throw new InvariantError('Gagal membatalkan menyukai album');
  }
  const message = 'Batal menyukai album';

  await _this._cacheService.delete(`countAlbumLike:${id}`);
  return message;
};

module.exports = deleteLikeInAlbumId;
