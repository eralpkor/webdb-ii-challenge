const router = require('express').Router();
const knex = require('knex');
const validation = require('../middleware/middleware.js');
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
router.put('/:id', (req, res) => {
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
router.post('/', validation, (req, res) => {
  db('cars')
    .insert(req.body, 'id')
    .then(ids => {
      console.log(ids)
      res.status(201).json({ carAdded: ids[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating...'});
    });
});

// DELETE /api/cars/:id delete a car
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('cars')
    .where({ id: id })
    .del()
    .then(count => {
      count ? res.status(200).json({ message: `Car with id: ${id} deleted`}) : res.status(404).json({ message: `That is an invalid id: ${id}`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Error deleting car with ID: ${id} `});
    });
});

module.exports = router;