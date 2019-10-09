function validateCar(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing car data!' });
  } else if (!req.body.VIN) {
    res.status(400).json({ message: 'Missing required "VIN" field!' });
  } else if (!req.body.make) {
    res.status(400).json({ message: 'Missing required "make" field!' });
  } else if (!req.body.model) {
    res.status(400).json({ message: 'Missing required "model" field!' });
  } else {
    next();
  }
}

module.exports = validateCar;