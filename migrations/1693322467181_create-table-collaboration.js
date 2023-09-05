/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('collaboration', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(25)',
      notNull: false,
      default: null,
      references: 'playlist',
      onDelete: 'CASCADE'
    },
    user_id: {
      type: 'VARCHAR(21)',
      notNull: false,
      default: null,
      references: 'user',
      onDelete: 'CASCADE'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom playlist_id dan user_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
    pgm.addConstraint('collaboration', 'unique_playlist_id_and_user_id', 'UNIQUE(playlist_id, user_id)');
};


exports.down = pgm => {
  pgm.sql("UPDATE collaboration SET playlist_id = NULL");
  pgm.sql("UPDATE collaboration SET user_id = NULL");
  pgm.dropTable('collaboration');
};