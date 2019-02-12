const dbq = require('../db/queries');

async function create({
  conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
}) {
  try {
    const response = await dbq.createTalk({
      conferenceID, title, description, startDatetime, endDatetime, maximumAttendance
    });
    return response;
  } catch (error) {
    console.log('Error in talks controller #create');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('talks');
    return response;
  } catch (error) {
    console.log('Error in talks controller #list');
    throw error;
  }
}

module.exports = {
  create,
  list
};
