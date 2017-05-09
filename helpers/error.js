const Raven = require('raven')

module.exports.capture = function (error, info = {}) {
  if (process.env.NODE_ENV !== 'development') {
    Raven.captureException(error, info)
  } else {
    console.error(error)
  }
}

module.exports.message = function (message) {
  if (process.env.NODE_ENV !== 'development') {
    Raven.captureMessage(message)
  } else {
    console.error(message)
  }
}

module.exports.fetchLatest = function (flash) {
  if (flash && flash.length !== 0) {
    let messages = flash.error
    return messages[messages.length - 1]
  }
}
