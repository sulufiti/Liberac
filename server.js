// Express imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Setting up express middlewares
const app = express()
const jsonParser = bodyParser.json()
const port = 3000
const router = express.Router()

// Routes
const index = require('./routes/index')

// Template rendering
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.locals.pretty = true

// Enabling middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Disable halfbaked features
if (app.get('env') === 'development') {
  const session = require('express-session')
  const passport = require('passport')
  const setupPassport = require('./auth').setupPassport
  
  const facebook = require('./routes/facebook')
  const auth = require('./routes/auth')
  
  var sessionSettings = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }

  app.use('/facebook', facebook)
  app.use('/auth', auth)
  app.use(passport.initialize())
  app.use(session(sessionSettings))
  setupPassport()
}

// Enable secure cookie in production (requires HTTPS so disabled on dev setup)
// if (app.get('env') === 'production') {
//   sessionSettings.cookie.secure = true
// }

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