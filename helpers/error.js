const Raven = require('raven')

module.exports.capture = function(error) {
  if (process.env.NODE_ENV !== 'development') {
    Raven.captureException(error) 
  } else {
    console.error(error)
  }
}

module.exports.message = function(message) {
  if (process.env.NODE_ENV !== 'development') {
    Raven.captureMessage(message)
  } else {
    console.error(message)
  }
}