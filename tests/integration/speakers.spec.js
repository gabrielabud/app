process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
chai.use(require('chai-properties'));

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: SPEAKERS', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /talks/:talkID/speakers', () => {
    context('SUCCESS: Send POST request to create a conference', () => {
      it('should return the resource created', (done) => {
        chai.request(server)
          .post('/talks/12/speakers')
          .send({
            firstName: 'Gabriela',
            lastName: 'Ela',
            email: 'gabriela@gmail.com',
            bio: 'specialist in PSD2',
            photoUrl: 'https://unsplash.com/photos/MoDcnVRN5JU'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.properties({
              talk_id: 12,
              first_name: 'Gabriela',
              last_name: 'Ela',
              email: 'gabriela@gmail.com',
              bio: 'specialist in PSD2',
              photo_url: 'https://unsplash.com/photos/MoDcnVRN5JU'
            });
            res.body.should.have.length(1);
            done();
          });
      });
    });
  });
});
