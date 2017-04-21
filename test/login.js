const Nightmare = require('nightmare')
const expect = require('chai').expect
require('dotenv').config({path: '../.env'})
const server = require('../servercfg')
const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig['development'])

describe('Sign up tests', function() {
  this.timeout(0)
  let nightmare = null

  beforeEach(() => {
    server.listen(3000, false)
    nightmare = new Nightmare({ show: false })
  })

  afterEach(() => {
    server.close()
  })

  describe('Login page rejects upon incorrect details', function() {
    it('redirected back to login upon incorrect username', function(done) {
      this.timeout(0)
      nightmare
        .goto('http://localhost:3000/login')
        .insert('#username', 'notarealuser')
        .insert('#password', 'notarealpassword')
        .click('#login')
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
    
    it('redirected back to login upon incorrect username', function(done) {
      this.timeout(0)
      nightmare
        .goto('http://localhost:3000/login')
        .insert('#username', 'notarealuser')
        .insert('#password', 'notarealpassword')
        .click('#login')
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

  describe('Login page... logins in with correct user details', function() {
    it('logs in with correct details', function(done) {
      this.timeout(0)
      nightmare
        .goto('http://localhost:3000/login')
        .insert('#username', 'george1234')
        .insert('#password', 'george1234')
        .click('#login')
        .wait(500)
        .url()
        .end()
        .then((url) => {
          expect(url).to.equal('http://localhost:3000/dashboard')
          done()
        })
        .catch((err) => {
          console.log('wrong username, wrong pass failed', err)
        })
    })
  })
})