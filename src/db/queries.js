const knex = require('./knex');

async function createConference({ name }) {
  try {
    const response = await knex.insert({ name }).into('conferences').returning('*');
    return response;
  } catch (error) {
    console.log('Error in knex queries #createConference', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
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
    console.log('Error in knex queries #createTalk', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function createSpeaker({
  talkID, firstName, lastName, email, bio, photoUrl
}) {
  try {
    const response = await knex.insert({
      talk_id: talkID,
      first_name: firstName,
      last_name: lastName,
      email,
      bio,
      photo_url: photoUrl
    }).into('speakers').returning('*');
    return response;
  } catch (error) {
    console.log('Error in knex queries #createSpeaker', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function createAttendee({
  conferenceID, firstName, lastName, email
}) {
  try {
    const response = await knex.insert({
      conference_id: conferenceID,
      first_name: firstName,
      last_name: lastName,
      email
    }).into('attendees').returning('*');
    return response;
  } catch (error) {
    console.log('errror', error);
    console.log('Error in knex queries #createAttendee', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function getMaximumAttendancePerTalk({
  talkID
}) {
  try {
    const response = await knex.select('maximum_attendance').from('talks').where({ id: talkID });
    return response[0].maximum_attendance;
  } catch (error) {
    console.log('Error in knex queries #getMaximumAttendancePerTalk', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function listByTalkID({
  tableName, talkID
}) {
  try {
    const response = await knex.select().from(`${tableName}`).where({ talk_id: talkID });
    return response;
  } catch (error) {
    console.log('Error in knex queries #listByTalkID', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function createRsvp({
  talkID, attendeeID
}) {
  try {
    const maxAttendancePerTalk = await getMaximumAttendancePerTalk({ talkID });
    const rsvpsPerTalk = await listByTalkID({ tableName: 'rsvps', talkID });
    if (rsvpsPerTalk.length < maxAttendancePerTalk) {
      const response = await knex.insert({
        talk_id: talkID,
        attendee_id: attendeeID
      }).into('rsvps').returning('*');
      return response;
    }
    throw new Error('Talk fully booked');
  } catch (error) {
    console.log('Error in knex queries #createRsvp', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

async function list(tableName) {
  try {
    const response = await knex.select().from(`${tableName}`);
    return response;
  } catch (error) {
    console.log('Error in knex queries #list', `with following error message: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createConference,
  createTalk,
  createSpeaker,
  createAttendee,
  createRsvp,
  list,
  listByTalkID
};
