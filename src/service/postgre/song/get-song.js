const getSong = async (_this, title, performer) => {
  const result = await _this._pool.query(
    `SELECT id, title, performer FROM song WHERE ${
      title ? `title LIKE '%${title}%'` : 'TRUE'
    } AND ${performer ? `performer LIKE '%${performer}%'` : 'TRUE'}`
  );
  return result.rows;
};

module.exports = getSong;
