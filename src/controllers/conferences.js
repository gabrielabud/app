const dbq = require('../db/queries');
const { errorHandler } = require('../helper');

async function create({ name }) {
  try {
    const response = await dbq.createConference({ name });
    return response;
  } catch (error) {
    const errorHandled = errorHandler(error);
    throw errorHandled;
  }
}

async function list() {
  try {
    const response = await dbq.list('conferences');
    return response;
  } catch (error) {
    const errorHandled = errorHandler(error);
    throw errorHandled;
  }
}

module.exports = {
  create,
  list
};