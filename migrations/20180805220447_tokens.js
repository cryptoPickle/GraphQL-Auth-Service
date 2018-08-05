
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tokens', function(tbl){
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    tbl.uuid('user_id').notNullable().references('id').inTable('users');
    
    tbl.string('google_access_token').nullable();
    tbl.string('facebook_access_token').nullable();
    tbl.string('jwt_refresh_token').nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tokens');
};


