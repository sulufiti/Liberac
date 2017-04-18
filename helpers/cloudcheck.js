const crypto = require('crypto')
const got = require('got')
const hmac = crypto.createHmac('sha256', process.env.CLOUDCHECK_SECRET)

// TODO: User may not have a passport and/or drivers license. May also have vehicle and birth cert
// TODO: Figure out a better way of storing nonces and keep verifications somewhere once using actual data
// TODO: Generate unique references too

const verifyUser = (user, nonce) => {
  let data = {
    "details": {
      "address": {
        "street": user.street,
        "postcode": user.postcode,
        "city": user.city
      },
      "name": {
        "given": user.first_name,
        "family": user.last_name
      },
      "driverslicence": {},
      "passport": {
        "number": user.passport_number,
        "expiry": user.passport_expiry
      },
      "citizenship": {},
      "country": {},
      "birthcertificate" : {},
      "vehicle": {},
      "dateofbirth": user.dateofbirth
    },
    "reference": "3",
    "consent": "Yes"
  }

  if (user.suburb) { data.details.address.suburb = user.suburb }
  if (user.middle_name) { data.details.name.middle = user.middle_name }

  const current_time = Date.now()
  console.log(data)

  hmac.update(`/verify/data=${JSON.stringify(data)};key=${process.env.CLOUDCHECK_API_KEY};nonce=${nonce};timestamp=${current_time};`)
  const cloudsignature = hmac.digest('hex')

  return got.post('https://api.cloudcheck.co.nz/verify/', {
    body: {
      key: process.env.CLOUDCHECK_API_KEY,
      signature: cloudsignature,
      nonce: nonce,
      timestamp: current_time,
      data: JSON.stringify(data)
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = {
  verifyUser
}