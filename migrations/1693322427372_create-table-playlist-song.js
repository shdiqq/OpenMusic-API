/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlist_song', {
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
    song_id: {
      type: 'VARCHAR(21)',
      notNull: false,
      default: null,
      references: 'song',
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
    Menambahkan constraint UNIQUE, kombinasi dari kolom playlist_id dan song_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
    pgm.addConstraint(
      "playlist_song",
      "unique_playlist_id_and_song_id",
      "UNIQUE(playlist_id, song_id)"
    );
};


exports.down = (pgm) => {
  pgm.dropConstraint("playlist_song", "unique_playlist_id_and_song_id");
  pgm.sql("UPDATE playlist_song SET playlist_id = NULL");
  pgm.sql("UPDATE playlist_song SET song_id = NULL");
  pgm.dropTable('playlist_song');
};