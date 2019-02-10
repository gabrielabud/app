const dbq = require('../db/queries');
const { errorHandler } = require('../helper');

async function create({
  conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
}) {
  try {
    const response = await dbq.createTalk({
      conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
    });
    return response;
  } catch (error) {
    const errorHandled = errorHandler(error);
    throw errorHandled;
  }
}

async function list() {
  try {
    const response = await dbq.list('talks');
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
