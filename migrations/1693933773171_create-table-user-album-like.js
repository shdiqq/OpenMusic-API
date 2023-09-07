/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("user_album_like", {
    id: {
      type: 'VARCHAR(32)',
      primaryKey: true,
    },
    album_id: {
      type: 'VARCHAR(22)',
      notNull: false,
      default: null,
      references: 'album',
      onDelete: 'CASCADE'
    },
    user_id: {
      type: 'VARCHAR(21)',
      notNull: false,
      default: null,
      references: 'user',
      onDelete: 'CASCADE'
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom album_id dan user_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint(
    "user_album_like",
    "unique_album_id_and_user_id",
    "UNIQUE(album_id, user_id)"
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("user_album_like", "unique_album_id_and_user_id");
  pgm.sql("UPDATE user_album_like SET album_id = NULL");
  pgm.sql("UPDATE user_album_like SET user_id = NULL");
  pgm.dropTable("user_album_like");
};
