
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments(); // adding unique ID
    tbl.string('VIN', 18).notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.integer('mileage');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
