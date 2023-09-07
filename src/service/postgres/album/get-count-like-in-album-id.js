const getCountLikeInAlbumId = async (_this, id) => {
  try {
    const source = 'cache';
    const likes = await _this._cacheService.get(`countAlbumLike:${id}`);
    return { likes: +likes, source };
  } catch (error) {
    await _this.getAlbumByIdService(id);

    const result = await _this._pool.query({
      text: 'SELECT id FROM user_album_like WHERE album_id = $1',
      values: [id],
    });

    const likes = result.rowCount;
    await _this._cacheService.set(`countAlbumLike:${id}`, likes);
    const source = 'server';

    return { likes, source };
  }
};

module.exports = getCountLikeInAlbumId;
