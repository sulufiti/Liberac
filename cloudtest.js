require('dotenv').config()
const crypto = require('crypto')
const axios = require('axios')
const hmac = crypto.createHmac('sha256', process.env.CLOUDCHECK_SECRET)
const querystring = require('querystring')

const user = {
  "details": {
    "address": {
      "streetnumber": "129",
      "streetname": "Edinburgh Street",
      "postcode": "4702",
      "city": "Feilding"
    },
    "name": {
      "given": "Jayden",
      "family": "Edgerton"
    },
    "driverslicence": {
      "number": "AB654321",
      "version": "002"
    },
    "passport": {},
    "citizenship": {},
    "country": {},
    "birthcertificate" : {
      "registrationnumber" : "1994008521"
    },
    "vehicle": {},
    "dateofbirth": "1994-04-04"
  },
  "reference": "3",
  "consent": "Yes"
}

const current_time = Date.now()

hmac.update(`/verify/data=${JSON.stringify(user)};key=${process.env.CLOUDCHECK_API_KEY};nonce=6;timestamp=${current_time};`)

const cloudsignature = hmac.digest('hex')

axios.post('https://api.cloudcheck.co.nz/verify/', querystring.stringify({ data: JSON.stringify(user), key: process.env.CLOUDCHECK_API_KEY, nonce: 6, signature: cloudsignature, timestamp: current_time }))
.then((res) => {
  console.log(res.data)
})
.catch((err) => {
  console.error(err)
})