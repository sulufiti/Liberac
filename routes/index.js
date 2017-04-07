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
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect('/loggedin')
})

router.get('/loggedin', (req, res, next) => {
  res.send('you are now logged in')
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/loggedout')
})

router.get('/loggedout', (req, res, next) => {
  res.send('you are now logged out')
})

module.exports = router