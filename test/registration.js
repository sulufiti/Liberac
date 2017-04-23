const Nightmare = require('nightmare')
const expect = require('chai').expect
require('dotenv').config({path: '../.env'})
const server = require('../servercfg')
const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig['development'])

describe('Registration tests', function() {
  this.timeout(0)
  let nightmare = null

  beforeEach((done) => {
    nightmare = new Nightmare({ show: false })
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        knex.seed.run()
        .then(function() {
          server.listen(3000, false)
          done()
        })
      })
    })
  })

  afterEach(() => {
    server.close()
  })

  describe('Registration page redirects to login page upon successful signup', function() {
    it('registration submits successfully | user with all fields filled', function(done) {
      this.timeout(0)
      nightmare
        .goto('http://localhost:3000/register')
        .insert('#username', 'coopertrooper78')
        .insert('#password', 'coopertrooper78')
        .insert('#first_name', 'Cooper')
        .insert('#middle_name', 'John')
        .insert('#last_name', 'Down')
        .insert('#phone', '0218347345')
        .insert('#email', 'cooper@veterans.mil')
        .insert('#street', '27 Indira Lane')
        .insert('#suburb', 'Hillsborough')
        .insert('#dateofbirth', '1978-01-10')
        .insert('#city', 'Christchurch')
        .insert('#postcode', '8022')
        .click('#terms')
        .click('#register')
        .wait(500)
        .url()
        .end()
        .then((url) => {
          expect(url).to.equal('http://localhost:3000/login')
          done()
        })
        .catch((err) => {
          console.log('wrong username, wrong pass failed', err)
        })
    })

    it('registration submits successfully | user with no suburb or middle name', function(done) {
      this.timeout(0)
      nightmare
        .goto('http://localhost:3000/register')
        .insert('#username', 'jayden94')
        .insert('#password', 'jayden94')
        .insert('#first_name', 'Jayden')
        .insert('#last_name', 'Edgerton')
        .insert('#phone', '02748323453')
        .insert('#email', 'jayden94@gmail.com')
        .insert('#street', '129 Edinburgh Street')
        .insert('#dateofbirth', '1994-04-04')
        .insert('#city', 'Fielding')
        .insert('#postcode', '4702')
        .click('#terms')
        .click('#register')
        .wait(500)
        .url()
        .end()
        .then((url) => {
          expect(url).to.equal('http://localhost:3000/login')
          done()
        })
        .catch((err) => {
          console.log('wrong username, wrong pass failed', err)
        })
    })
  })
})