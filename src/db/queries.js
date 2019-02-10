const knex = require('./knex');
const { errorHandler } = require('../helper');

async function createConference({ name }) {
  try {
    const response = await knex.insert({ name }).into('conferences').returning('*');
    return response;
  } catch (error) {
    const errorHandled = errorHandler(error);
    throw errorHandled;
  }
}

async function list(tableName) {
  try {
    const response = await knex.select().from(`${tableName}`);
    return response;
  } catch (error) {
    const errorHandled = errorHandler(error);
    throw errorHandled;
  }
}
module.exports = {
  createConference,
  list
};
