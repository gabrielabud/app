exports.seed = (knex) => {
  return knex('attendees').del()
    .then(() => {
      return knex('attendees').insert(
        {
          id: 10,
          conference_id: 2,
          first_name: 'Ana',
          last_name: 'Attendee1',
          email: 'ana.attendee1@gmail.com'
        }
      );
    })
    .then(() => {
      return knex('attendees').insert(
        {
          id: 11,
          conference_id: 2,
          first_name: 'Anna',
          last_name: 'Attendee2',
          email: 'ana.attendee2@gmail.com'
        }
      );
    })
    .then(() => {
      return knex('attendees').insert(
        {
          id: 12,
          conference_id: 2,
          first_name: 'Emma',
          last_name: 'Attendee3',
          email: 'emma.attendee3@gmail.com'
        }
      );
    })
    .then(() => {
      return knex('attendees').insert(
        {
          id: 13,
          conference_id: 2,
          first_name: 'Tom',
          last_name: 'Attendee4',
          email: 'tom.attendeet4@gmail.com'
        }
      );
    })
    .then(() => {
      return knex('attendees').insert(
        {
          id: 14,
          conference_id: 2,
          first_name: 'Joe',
          last_name: 'Attendee5',
          email: 'joe.attendeet5@gmail.com'
        }
      );
    })
    .then(() => {
      return knex('attendees').insert(
        {
          id: 15,
          conference_id: 2,
          first_name: 'Rachael',
          last_name: 'Attendee6',
          email: 'joe.attendeet6@gmail.com'
        }
      );
    });
};
