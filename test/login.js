const Nightmare = require('nightmare')
const expect = require('chai').expect
const got = require('got')
require('dotenv').config({path: '../.env'})
const server = require('../server')

describe('Login page works as expected', function() {
  beforeEach(function() {
    server.listen(3000)
  })
  afterEach(function() {
    server.close()
  })
  it('is running', function testSlash(done) {
    got('http://localhost:3000/login')
    .then((res) => {
      expect(res.statusCode).to.equal(200)
      done()
    })
    .catch(err => {
      console.log('server offline')
    })
  })
})