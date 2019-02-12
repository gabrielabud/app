const dbq = require('../db/queries');

async function create({
  conferenceID, firstName, lastName, email
}) {
  try {
    const response = await dbq.createAttendee({
      conferenceID, firstName, lastName, email
    });
    return response;
  } catch (error) {
    console.log('Error in attendees controller #create');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('attendees');
    return response;
  } catch (error) {
    console.log('Error in attendees controller #list');
    throw error;
  }
}

module.exports = {
  create,
  list
};
