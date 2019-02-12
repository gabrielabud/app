process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-properties'));

const should = chai.should();

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: ATTENDEES', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /conferences/:conferenceID/attendees', () => {
    context('SUCCESS: Send POST request to create an attendee', () => {
      it('should return the resource created', (done) => {
        chai.request(server)
          .post('/conferences/2/attendees')
          .send({
            firstName: 'Tudor',
            lastName: 'Ela',
            email: 'tudor.ela@gmail.com'
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.properties({
              conference_id: 2,
              first_name: 'Tudor',
              last_name: 'Ela',
              email: 'tudor.ela@gmail.com'
            });
            res.body.should.have.length(1);
            done();
          });
      });
    });
  });
});
