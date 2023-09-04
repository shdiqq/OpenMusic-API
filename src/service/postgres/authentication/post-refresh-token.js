const postRefreshToken = async (_this, token) => {
  const query = {
    text: 'INSERT INTO authentication VALUES($1)',
    values: [token],
  };

  await _this._pool.query(query);
};

module.exports = postRefreshToken;
