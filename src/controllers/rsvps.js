const dbq = require('../db/queries');

async function create({ talkID, attendeeID }) {
  try {
    const response = await dbq.createRsvp({ talkID, attendeeID });
    return response;
  } catch (error) {
    console.log('Error in rsvps controller #create');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('rsvps');
    return response;
  } catch (error) {
    console.log('Error in rsvps controller #list');
    throw error;
  }
}

async function listByTalkID(talkID) {
  try {
    const response = await dbq.listByTalkID({ tableName: 'rsvps', talkID });
    return response;
  } catch (error) {
    console.log('Error in rsvps controller #listByTalkID');
    throw error;
  }
}

module.exports = {
  create,
  list,
  listByTalkID
};
