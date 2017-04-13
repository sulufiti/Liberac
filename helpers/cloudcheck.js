const crypto = require('crypto')
const axios = require('axios')
const hmac = crypto.createHmac('sha256', process.env.CLOUDCHECK_SECRET)
const querystring = require('querystring')

const verifyUser = (user, nonce) => {
  const data = {
    "details": {
      "address": {
        "street": user.street,
        "suburb": user.suburb,
        "postcode": user.postcode,
        "city": user.city
      },
      "name": {
        "given": user.first_name,
        "middle": user.middle_name,
        "family": user.last_name
      },
      "passport": {
        "number": user.passportnumber,
        "expiry": user.passportexpiry
      },
      "dateofbirth": user.dateofbirth
    },
    "reference": "1",
    "consent": "Yes"
  }

  const current_time = Date.now()
  hmac.update(`/verify/data=${JSON.stringify(data)};key=${process.env.CLOUDCHECK_API_KEY};nonce=${nonce};timestamp=${current_time};`)
  const cloudsignature = hmac.digest('hex')

  return axios.post('https://api.cloudcheck.co.nz/verify/', querystring.stringify({ data: JSON.stringify(data), key: process.env.CLOUDCHECK_API_KEY, nonce: nonce, signature: cloudsignature, timestamp: current_time }))
  .catch((err) => {
    console.error(err)
  })
}

module.exports = {
  verifyUser
}