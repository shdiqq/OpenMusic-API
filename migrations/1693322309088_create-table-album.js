/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('album', {
    id: {
      type: 'VARCHAR(22)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INT',
      notNull: true,
    },
    cover: {
      type: 'TEXT',
      notNull: false,
      default: null,
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
  pgm.dropTable('album');
};