const dbq = require('../db/queries');

async function create({
  talkID, firstName, lastName, email, bio, photoUrl
}) {
  try {
    const response = await dbq.createSpeaker({
      talkID, firstName, lastName, email, bio, photoUrl
    });
    return response;
  } catch (error) {
    console.log('Error in speakers controller #create');
    throw error;
  }
}

async function listByTalkID(talkID) {
  try {
    const response = await dbq.listByTalkID({ tableName: 'speakers', talkID });
    return response;
  } catch (error) {
    console.log('Error in speakers controller #listByTalkID');
    throw error;
  }
}

async function list() {
  try {
    const response = await dbq.list('speakers');
    return response;
  } catch (error) {
    console.log('Error in speakers controller #list');
    throw error;
  }
}

module.exports = {
  create,
  list,
  listByTalkID
};
