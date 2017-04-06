const express = require('express')
const router = express.Router()
const passport = require('passport')
const uuidV4 = require('uuid/v4')

const Knex = require('knex')
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/confirm', (req, res, next) => {
  knex('users')
  .returning('id')
  .insert({
    id: uuidV4(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.phone,
    email: req.body.email,
    address: req.body.address, 
    accepted_agreement: true
  })
  .then((id) => { return knex('users').where('id', id[0]) })
  .then((user) => {
    res.json(user)
  })
})

router.get('/login', (req, res, next) => {
  res.send('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/login' 
}))

module.exports = router