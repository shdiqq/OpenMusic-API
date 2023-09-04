/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(41)',
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
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(21)',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(22)',
      notNull: true,
    },
    time: {
      type: 'VARCHAR(22)',
      notNull: true,
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
  pgm.dropTable('playlist_song_activities');
};