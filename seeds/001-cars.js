
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')//.del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: '90H7FP22Z4J6590456',
          make: 'Chevrolet',
          model: 'Camaro',
          mileage: 5100
        },
        {
          VIN: '10O7FP45Z4J6592211',
          make: 'Ford',
          model: 'Mustang',
          mileage: 5
        },
        {
          VIN: '13K7OL34S4Y3211111',
          make: 'Volkswagen',
          model: 'GTI',
          mileage: 81000
        },
      ]);
    });
};
