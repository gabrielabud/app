process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-properties'));

const should = chai.should(); //eslint-disable-line

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: TALKS', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('/conferences/:conferenceID/talks', () => {
    context('SUCCESS: Send POST request to create a talk', () => {
      it('should return the resource created', (done) => {
        chai.request(server)
          .post('/conferences/2/talks')
          .send({
            title: 'First Talk Open Banking',
            description: 'Open Banking future',
            startDatetime: '2019-01-15 17:00:00',
            endDatetime: '2019-01-15 18:00:00',
            maximumAttendance: 30
          })
          .end((err, res) => {
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.properties({
              conference_id: 2,
              title: 'First Talk Open Banking',
              description: 'Open Banking future',
              start_datetime: '2019-01-15T17:00:00.000Z',
              end_datetime: '2019-01-15T18:00:00.000Z',
              maximum_attendance: 30
            });
            res.body.should.have.length(1);
            done();
          });
      });
    });

    context('FAILURE: request to create a talk with a title that already exists', () => {
      it('should return an 500 error', (done) => {
        chai.request(server)
          .post('/conferences/2/talks')
          .send({
            conference_id: 2,
            title: 'PSD2 & Germany',
            description: 'PSD2 Developments in Germany Again',
            start_datetime: '2019-01-15 12:00:00',
            end_datetime: '2019-01-15 13:00:00',
            maximum_attendance: 6
          })
          .end((err, res) => {
            res.status.should.eql(500);
            done();
          });
      });
    });
  });

  describe('/talks', () => {
    context('SUCCESS: Send GET request to retrieve the list of talks', () => {
      it('should list all the talks', (done) => {
        chai.request(server)
          .get('/talks')
          .end((err, res) => {
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('maximum_attendance');
            res.body.should.have.length(2);
            done();
          });
      });
    });
  });
});
