exports.seed = (knex) => {
  return knex('talks').del()
    .then(() => {
      return knex('talks').insert(
        {
          id: 11,
          conference_id: 2,
          title: 'PDS2 Future',
          description: 'PSD2 Future as seen in Europe',
          start_datetime: '2019-01-15 13:00:00',
          end_datetime: '2019-01-15 14:00:00',
          maximum_attendance: 5
        }
      );
    }).then(() => {
      return knex('talks').insert(
        {
          id: 12,
          conference_id: 2,
          title: 'PSD2 & Germany',
          description: 'PSD2 Developments in Germany',
          start_datetime: '2019-01-15 12:00:00',
          end_datetime: '2019-01-15 13:00:00',
          maximum_attendance: 6
        }
      );
    });
};
