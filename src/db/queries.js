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

async function createTalk({
  conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
}) {
  try {
    const response = await knex.insert({
      conference_id: conferenceID,
      title,
      description,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      maximum_attendance: maximumAttendance
    }).into('talks').returning('*');
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
  createTalk,
  list
};
