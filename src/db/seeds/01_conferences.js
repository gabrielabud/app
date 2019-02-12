exports.seed = (knex) => {
  return knex('talks').del()
    .then(() => {
      return knex('conferences').insert(
        { id: 2, name: 'Super Fintech Conference' }
      );
    });
};
