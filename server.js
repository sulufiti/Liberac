// Express imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const session = require('express-session')

// Local imports
const setupPassport = require('./auth').setupPassport

// Setting up express middlewares
const app = express()
const jsonParser = bodyParser.json()
const port = 3000
const router = express.Router()
let sessionSettings = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {}
}

// Enable secure cookie in production (requires HTTPS so disabled on dev setup)
if (app.get('env') === 'production') {
  sessionSettings.cookie.secure = true
}

// Routes
const index = require('./routes/index')

// Template rendering
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.locals.pretty = true

// Enabling middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(session(sessionSettings))
setupPassport()

// Serve static files and routes that use templates
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)

// Error handlers
// TODO: Create error page for error handlers
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err)
})

// Listen on a server defined port if it exists
app.listen(process.env.PORT || port, () => {
  console.log(`Liberac is now being served at http://localhost:${port}`)
  console.log(`Running in ${app.get('env').toUpperCase()} mode`)
})

module.exports = app