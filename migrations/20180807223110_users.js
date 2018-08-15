
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()')).unique();


    tbl.string('email', 60).unique();
    tbl.string('password', 60).nullable();




    tbl.string('name', 60).notNullable();
    tbl.string('surname', 60).notNullable();
    tbl.integer('age').nullable();
    tbl.date('birthday');
    tbl.enu('gender', ['male', 'female', 'other']);

    tbl.string('google_profile_id').nullable();
    tbl.boolean('google_verified').default(false);
    tbl.string('facebook_profile_id').nullable();
    tbl.boolean('facebook_verified').default(false);

    tbl.boolean('isCompleted').notNullable().default(false);
    tbl.boolean('isFrozen').notNullable().default(false);
    tbl.integer('email_verification_code').nullable();
    tbl.boolean('email_verified').notNullable().default(false);


    tbl.float('created_at').notNullable();
    tbl.float('updated_at').nullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
