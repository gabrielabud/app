
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(require('chai-properties'));

const should = chai.should();

const server = require('../../src').app;
const knex = require('../../src/db/knex');

describe('routes: CONFERENCES', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /conferences', () => {
    context('SUCCESS: Send POST request to create a conference', () => {
      it('should return the conference resource created', (done) => {
        chai.request(server)
          .post('/conferences')
          .send({ name: 'Future of Fintech' })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.properties({
              name: 'Future of Fintech'
            });
            res.body.should.have.length(1);
            done();
          });
      });
    });
  });

  describe('GET /conferences', () => {
    context('SUCCESS: Send GET request to list the conference created', () => {
      it('should return the conference ', (done) => {
        chai.request(server)
          .get('/conferences')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body[0].should.have.property('name');
            res.body.should.have.length(1);
            done();
          });
      });
    });
  });
});
