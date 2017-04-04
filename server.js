const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const router = express.Router()
const jsonParser = bodyParser.json()
const port = 3000

const index = require('./routes/index')

app.set('views', path.join(__dirname, 'views'))

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => {
  console.log(`Now available at http://localhost:${port}`)
})

module.exports = app