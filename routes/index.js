const express = require('express')
const jsonfile = require('jsonfile')
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
  passport.authenticate('local', {
    successRedirect: '/loggedin', 
    failureRedirect: '/login' 
  })
)

router.get('/loggedin', (req, res, next) => {
  res.send(`Welcome ${req.session.passport.user.first_name} ${req.session.passport.user.last_name}`)
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/loggedout')
})

router.get('/loggedout', (req, res, next) => {
  fs.writeFileSync('logout.json', JSON.stringify(req))
  res.send('logged out')
})

module.exports = router