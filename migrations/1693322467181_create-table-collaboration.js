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
};


exports.down = pgm => {
  pgm.dropTable('collaboration');
};