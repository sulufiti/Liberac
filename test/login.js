const Nightmare = require('nightmare')
const expect = require('chai').expect
require('dotenv').config({path: '../.env'})
// const server = require('../server')


describe('Login page rejects upon incorrect details', function() {
  it('should be redirected back to login upon incorrect username', function (done) {
    this.timeout(0)
    const nightmare = Nightmare()
    nightmare
      .goto('http://localhost:3000/login')
      .type('#username', 'notarealuser')
      .type('#password', 'notarealpassword')
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
  
  it('should be redirected back to login upon incorrect username', function (done) {
    this.timeout(0)
    const nightmare = Nightmare()
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

describe('login page functions as expected', function() {
  it('login in with authentic details'), function(done) {
    this.timeout(0)
    const nightmare = Nightmare()
    nightmare
      .goto('http://localhost:3000/login')
      .insert('#username', 'george1234')
      .insert('#password', 'george1234')
      .click('#login')
      .url()
      .end()
      .then((url) => {
        expect(url).to.equal('http://localhost:3000/dashboard')
        done()
      })
      .catch((err) => {
        console.log('failed to login in properly')
      })
  }
})