const router = require('express').Router();
const validation = require('../middleware/middleware.js');

const Cars = require('../data/db-helper.js');


// CRUD endpoints......
// GET /api/cars endpoint get all cars
router.get('/', (req, res) => {
  Cars.find()
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

    Cars.findById(id)
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

  Cars.update(id, req.body)
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
  Cars.insert(req.body)
  .then(ids => {
    console.log(ids)
    res.status(201).json({ carAdded: ids });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Error creating...'});
  });
});

// DELETE /api/cars/:id delete a car
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  Cars.remove(id)
    .then(count => {
      count ? res.status(200).json({ message: `Car with id: ${id} deleted`}) : res.status(404).json({ message: `That is an invalid id: ${id}`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Error deleting car with ID: ${id} `});
    });
});

module.exports = router;