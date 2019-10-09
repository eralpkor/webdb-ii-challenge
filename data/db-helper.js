// const db = require('./dealer.db3');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
}

function find() {
  return db('cars')
}

function findById(id) {
  return db('cars').where({ id }).first()
}

function insert(car) {
  return db('cars')
    .insert(car)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db('cars')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('cars')
    .where('id', id)
    .del();
}