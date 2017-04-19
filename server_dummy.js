// Express imports
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// Setting up express middlewares
const app = express()
const hbs = require('hbs')
const port = 3000

// Routes
const index = require('./routes/index')

// Template rendering
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.locals.pretty = true

// Enabling middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Enalbe routes
app.use('/', index)

// Serve static files and routes that use templates
app.use(express.static(path.join(__dirname, '/public')))

// Error handlers
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
