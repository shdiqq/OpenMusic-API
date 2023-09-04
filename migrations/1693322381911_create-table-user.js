/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('user', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
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
  pgm.dropTable('user');
};