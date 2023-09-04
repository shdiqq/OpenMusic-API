const getSong = async (_this, title, performer) => {
  const result = await _this._pool.query(
    `SELECT id, title, performer FROM song WHERE ${
      title ? `title ILIKE '%${title}%'` : 'TRUE'
    } AND ${performer ? `performer ILIKE '%${performer}%'` : 'TRUE'}`
  );
  return result.rows;
};

module.exports = getSong;
