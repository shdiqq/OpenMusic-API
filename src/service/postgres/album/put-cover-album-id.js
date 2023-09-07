const putCoverAlbumId = async (_this, id, fileLocation) => {
  await _this._pool.query({
    text: 'UPDATE album SET cover = $1 WHERE id = $2 RETURNING id',
    values: [fileLocation, id],
  });
};

module.exports = putCoverAlbumId;
