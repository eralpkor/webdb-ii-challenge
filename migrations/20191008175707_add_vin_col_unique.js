// 
exports.up = function(knex) {
  return knex.schema.alterTable('cars', tbl => {
    tbl.unique('VIN');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('cars', tbl => {
    tbl.dropUnique('VIN');
  });
};
