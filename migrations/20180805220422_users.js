
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    tbl.string('email', 60).notNullable().unique();
    tbl.string('password', 60).notNullable().unique();
    tbl.string('name', 60).notNullable();
    tbl.string('surname', 60).notNullable();
    tbl.integer('age').nullable();
    tbl.date('birthday');
    tbl.enu('gender', ['male', 'female', 'other']);


    tbl.string('google_profile_url').nullable();
    tbl.string('google_verified').default(false);
    tbl.string('facebook_profile_url').nullable();
    tbl.string('facebook_verified').default(false);
    
    tbl.dateTime('created_at').notNullable();
    tbl.dateTime('updated_at').nullable();
    tbl.dateTime('deleted_at').nullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
