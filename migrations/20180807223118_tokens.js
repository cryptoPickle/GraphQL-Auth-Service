
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tokens', function(tbl){
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    tbl.uuid('user_id').notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');

    tbl.string('google_access_token',600).nullable();
    tbl.string('facebook_access_token',600).nullable();
    tbl.string('jwt_access_token',600).notNullable()
    tbl.string('jwt_refresh_token',600).notNullable();

    tbl.float('created_at').notNullable();
    tbl.float('updated_at').nullable();
    tbl.float('deleted_at').nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tokens');
};


