const bcrypt = require('bcrypt')
const saltRounds = 10

const hash = (password) => {
  return bcrypt.hash(password, saltRounds)
}

module.exports = { hash }