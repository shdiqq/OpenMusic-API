/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('song', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INT',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    duration: {
      type: 'INT',
      notNull: false,
      default: null,
    },
    album_id: {
      type: 'VARCHAR(22)',
      notNull: false,
      default: null,
      references: 'album',
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
};


exports.down = (pgm) => {
  pgm.sql("UPDATE song SET album_id = NULL");
  pgm.dropTable('song');
};