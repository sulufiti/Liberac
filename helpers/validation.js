const Validator = require('better-validator')
const validator = new Validator()

module.exports.registerInterest = function (query) {
  validator(query).required().isObject((obj) => {
    obj('first_name').required().isString().isAlpha()
    obj('last_name').required().isString().isAlpha()
    obj('email').required().isString().isEmail()
  })
  return validator.run()
}

module.exports.registration = function (query) {
  validator(query).required().isObject((obj) => {
    obj('first_name').required().isString().isAlpha()
    obj('middle_name').isString()
    obj('last_name').required().isString().isAlpha()
    obj('username').required().isString().isEmail()
    obj('password').required().isString()
    obj('phone').required().isString()
    obj('street').required().isString()
    obj('suburb').isString()
    obj('city').required().isString()
    obj('postcode').required().isString()
    obj('country').required().isString()
    obj('passport_first_name').required().isString()
    obj('passport_middle_name').isString()
    obj('passport_last_name').required().isString()
    obj('date_of_birth').required().isString().isBefore('1998-12-31')
    obj('passport_number').required().isString()
    obj('passport_expiry_date').required().isString().isDate()
    obj('nationality').required().isString()
    obj('issuing_country').required().isString()
  })
  return validator.run()
}
