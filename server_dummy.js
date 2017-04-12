// Express imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

// Setting up express middlewares
const app = express()
const jsonParser = bodyParser.json()
const hbs = require('hbs')
const port = 3000
const router = express.Router()

// Template rendering
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.locals.pretty = true

// Enabling middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Serve static files and routes that use templates
app.use(express.static(__dirname + '/public'))

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