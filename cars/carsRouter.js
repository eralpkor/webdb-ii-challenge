const router = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

// CRUD endpoints......
// GET /api/cars endpoint get cars
router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving cars database...'});
    });
});

// GET by /api/cars/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cars')
    .where({ id: id })
    .first() // resolves the object
    .then(car => {
      car ? res.status(200).json(car) : res.status(404).json({ message: `Invalid car id: ${id}` })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Error getting car with id: ${id}` });
    });
});

// PUT /api/cars/:id update a car with id;
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cars')
    .where({ id: id })
    .update(req.body)
    .then(count => {
      count ? res.status(200).json({ message: `Car with id: ${id} has been updated...`}) : res.status(404).json({ message: `Invalid car id: ${id}`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Error updating car with id: ${id}`});
    });
});

// PODT /api/cars create a car...

module.exports = router;