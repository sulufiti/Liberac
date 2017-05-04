const Validator = require('better-validator')
const validator = new Validator()

module.exports.registerInterest = function(query) {
  validator(query).required().isObject((obj) => {
    obj('first_name').required().isString().isAlpha()
    obj('last_name').required().isString().isAlpha()
    obj('email').required().isEmail()
  })
}

module.exports.registration = function(query) {
  validator(query).required().isObject((obj) => {
    obj('email').required().isEmail()
    obj('password').required().isString()
    obj('first_name').required().isString().isAlpha()
    obj('last_name').required().isString().isAlpha()
  })
}

module.exports.contact = function(query) {
  validator(query).required().isObject((obj) => {
    obj('user_id').required().isUUID()
    obj('nickname').required().isString().isAlpha()
    obj('first_name').required().isString().isAlpha()
    obj('middle_name').isString().isAlpha()
    obj('last_name').required().isString().isAlpha()
    obj('phone').required().isMobilePhone()
    obj('email').required().isEmail()
    obj('street').required().
  })
}