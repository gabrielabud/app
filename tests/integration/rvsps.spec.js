process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
chai.use(require('chai-properties'));

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: RSVPS', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /rsvps/talks/:talkID/attendees/:attendeeID', () => {
    context('SUCCESS: Send POST request to create a rsvp by an attendee for a talk', () => {
      it('should return the rsvp resource created', (done) => {
        chai.request(server)
          .post('/rsvps/talks/12/attendees/13')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.properties({
              talk_id: 12,
              attendee_id: 13
            });
            res.body.should.have.length(1);
            done();
          });
      });
    });

    context('FAILURE: Send POST request to create a rsvp by an attendee for a fully booked talk', () => {
      it('should return an 500 error', (done) => {
        chai.request(server)
          .post('/rsvps/talks/11/attendees/15')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(500);
            done();
          });
      });
    });
  });
});
