const server = require('express').Router();
const helmet = require('helmet');

const carRouter = require('../cars/carsRouter.js');

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carRouter);

module.exports = server;