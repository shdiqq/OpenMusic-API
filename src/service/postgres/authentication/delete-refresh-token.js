const deleteRefreshToken = async (_this, token) => {
  await _this.getRefreshTokenService(token);

  const query = {
    text: 'DELETE FROM authentication WHERE token = $1',
    values: [token],
  };

  await _this._pool.query(query);
};

module.exports = deleteRefreshToken;
