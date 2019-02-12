const dbq = require('../db/queries');

async function create({ name }) {
  try {
    const response = await dbq.createConference({ name });
    return response;
  } catch (error) {
    console.log('Error in conferences controller #create');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('conferences');
    return response;
  } catch (error) {
    console.log('Error in conferences controller #list');
    throw error;
  }
}

module.exports = {
  create,
  list
};
