const getPlaylist = async (_this, { owner }) => {
  const query = {
    text: `
    SELECT p.id, name, u.username 
    FROM playlist p 
    LEFT JOIN "user" u ON p."owner" = u.id 
    LEFT JOIN collaboration c ON p.id = c.playlist_id 
    WHERE p.owner = $1 OR c.user_id = $2`,
    values: [owner, owner],
  };
  const result = await _this._pool.query(query);

  return result.rows;
};

module.exports = getPlaylist;
