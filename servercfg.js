// Express imports
require('dotenv').config()
const express = require('express')
const Raven = require('raven')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const fileupload = require('express-fileupload')

// Local imports
const setupPassport = require('./auth').setupPassport

// Setting up express middlewares
const app = express()
Raven.config(process.env.SENTRY_DSN).install()
const hbs = require('hbs')
let sessionSettings = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {}
}

// Routes
const index = require('./routes/index')
const facebook = require('./routes/facebook')
const payees = require('./routes/payees')
// const cloudcheck = require('./routes/cloudcheck')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const rates = require('./routes/rates')

// Template rendering
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.locals.pretty = true

// Enabling middlewares
app.use(Raven.requestHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(fileupload())
app.use(session(sessionSettings))
setupPassport()

// Serve static files and routes that use templates
app.use(express.static(path.join(__dirname, '/public')))
app.use('/facebook', facebook)
app.use('/', index)
app.use('/', auth)
app.use('/', payees)
// app.use('/', cloudcheck)
app.use('/upload', upload)
app.use('/rates', rates)

// Error handlers
app.use(Raven.errorHandler())

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// 404 Handler
app.get('*', (req, res, next) => {
  res.render('error', {
    message: req.originalUrl,
    error: '404 Not Found'
  })
})

let server = require('http').createServer(app)

exports.listen = function (port, startupMessage) {
  server.listen(port)
  if (startupMessage) {
    console.log(`Liberac is now being served at http://localhost:${port}`)
    console.log(`Running in ${app.get('env').toUpperCase()} mode`)
  }
}

exports.close = function () {
  server.close()
}
