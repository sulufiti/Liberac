const crypto = require('crypto')
require('dotenv').config()
const axios = require('axios')
const hmac = crypto.createHmac('sha256', process.env.CLOUDCHECK_SECRET)
const querystring = require('querystring')

const user = {
  "details": {
    "address": {
      "suburb": "St Johns",
      "street": "5 Strong Street",
      "streetnumber": "5",
      "streetname": "Strong Street",
      "postcode": "1072",
      "city": "Auckland"
    },
    "name": {
      "given": "Arnold",
      "middle": "xxx",
      "family": "Schwarzenegger"
    },
    "driverslicence": {
      "number": "AB123456",
      "version": "111"
    },
    "passport": {
      "number": "US987654",
      "expiry": "2020-02-20"
    },
    "citizenship": {
      "certificatenumber" : "5556667778",
      "countryofbirth" : "Austria"
    },
    "country": {
      "residency" : "xxx",
      "citizenship" : "xxx"
    },
    "birthcertificate" : {
      "registrationnumber" : "5556667778"
    },
    "vehicle": {
      "numberplate": "xxx"
    },
    "dateofbirth": "1947-07-30"
  },
  "reference": "1",
  "consent": "Yes"
}

const current_time = 1491974411

// hmac.update(`/verify/data=${JSON.stringify(user)};key=${process.env.CLOUDCHECK_API_KEY};nonce=1;timestamp=${current_time};`)

// const hmac1 = hmac.digest('hex')
// console.log('hmac1', hmac1)

hmac.update(`/verify/data=${user};key=${process.env.CLOUDCHECK_API_KEY};nonce=1;timestamp=${current_time};`)

const hmac2 = hmac.digest('hex')
console.log('hmac2', hmac2)
// const params = {
//     data: JSON.stringify(user),
//     key: process.env.CLOUDCHECK_API_KEY,
//     nonce: 2,
//     signature: hmacSignature,
//     timestamp: current_time
//   }

// axios.post('https://api.cloudcheck.co.nz/verify/', querystring.stringify(params))
// .then((res) => {
//   console.log(res.data)
// })
// .catch((err) => {
//   console.error(err)
// })