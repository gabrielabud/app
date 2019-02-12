exports.seed = (knex) => {
  return knex('rsvps').del()
    .then(() => {
      return knex('rsvps').insert(
        {
          talk_id: 11,
          attendee_id: 10
        }
      );
    })
    .then(() => {
      return knex('rsvps').insert(
        {
          talk_id: 11,
          attendee_id: 11
        }
      );
    })
    .then(() => {
      return knex('rsvps').insert(
        {
          talk_id: 11,
          attendee_id: 12
        }
      );
    })
    .then(() => {
      return knex('rsvps').insert(
        {
          talk_id: 11,
          attendee_id: 13
        }
      );
    })
    .then(() => {
      return knex('rsvps').insert(
        {
          talk_id: 11,
          attendee_id: 14
        }
      );
    });
};
