
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('conferences', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    }),
    knex.schema.createTable('talks', (table) => {
      table.increments('id').primary();
      table.integer('conference_id').references('conferences.id');
      table.string('title').notNullable().unique();
      table.string('description').notNullable().unique();
      table.datetime('start_datetime');
      table.datetime('end_datetime');
      table.integer('maximum_attendance');
    }),
    knex.schema.createTable('speakers', (table) => {
      table.increments('id').primary();
      table.integer('talk_id').references('talks.id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.text('bio').notNullable();
      table.text('photo_url').notNullable().unique();
    }),
    knex.schema.createTable('attendees', (table) => {
      table.increments('id').primary();
      table.integer('conference_id').references('conferences.id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
    }),
    knex.schema.createTable('rsvps', (table) => {
      table.increments('id').primary();
      table.integer('talk_id').references('talks.id');
      table.integer('attendee_id').references('attendees.id');
      table.unique(['talk_id', 'attendee_id']);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('rsvps'),
    knex.schema.dropTable('attendees'),
    knex.schema.dropTable('speakers'),
    knex.schema.dropTable('talks'),
    knex.schema.dropTable('conferences')
  ]);
};
