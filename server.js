// Basic Express requirements
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Setting up express middlewares
const app = express()
const router = express.Router()
const jsonParser = bodyParser.json()
const port = 3000

// Routes
const index = require('./routes/index')

// Template rendering
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.locals.pretty = true

// Enabling middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
  console.log(`Liberac is now being served at http://localhost:${port}\n`)
  console.log(`Running in ${process.env.NODE_ENV} mode`)
})

module.exports = app