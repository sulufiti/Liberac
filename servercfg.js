// Express imports
require('dotenv').config()
const express = require('express')
const Raven = require('raven')
const path = require('path')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('cookie-session')
const fileupload = require('express-fileupload')
const hbs = require('hbs')
const Swag = require('swag')

// Local imports
const setupPassport = require('./auth').setupPassport

// Setting up express middlewares
const app = express()
Raven.config(process.env.SENTRY_DSN).install()

let cookieSettings = {
  name: 'session',
  keys: [process.env.EXPRESS_SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000
}

// Routes
const index = require('./routes/index')
const facebook = require('./routes/facebook')
const contacts = require('./routes/contacts')
const send = require('./routes/send')
const profile = require('./routes/profile')
// const cloudcheck = require('./routes/cloudcheck')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const rates = require('./routes/rates')

// Template rendering
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
Swag.registerHelpers(hbs)
app.locals.pretty = true

// Enabling middlewares
app.disable('x-powered-by')
app.use(Raven.requestHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(cookieSettings))
app.use(passport.initialize())
app.use(fileupload())
app.use(flash())
setupPassport()

// Serve static files and routes that use templates
app.use(express.static(path.join(__dirname, '/public')))
app.use('/facebook', facebook)
app.use('/', index)
app.use('/send', send)
app.use('/', auth)
app.use('/', contacts)
app.use('/', profile)
// app.use('/', cloudcheck)
app.use('/upload', upload)
app.use('/rates', rates)

// Error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    if (!req.session.authenticated) {
      res.redirect('/login')
    } else {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err
      })
    }
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  if (!req.session.authenticated) {
    res.redirect('/login')
  } else {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  }
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
